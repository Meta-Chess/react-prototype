import { Piece } from "./Piece";
import { Square } from "./Square";
import { Adjacency } from "./Adjacencies";
import { TokenOwner } from "./TokenOwner";
import { Direction, PieceDelta, RankAndFileBounds, Token, Player } from "game/types";
import { isPresent } from "utilities";
import { CompactRules } from "game/Rules/Rules";

interface LocationMap {
  [key: string]: Square;
}

interface PieceIdMap {
  [id: string]: Piece;
}

// TODO: This class is too long!
class Board extends TokenOwner {
  constructor(
    public squares: LocationMap = {},
    public pieces: PieceIdMap = {},
    public tokens: Token[] = []
  ) {
    super(tokens);
  }

  clone(): Board {
    const squaresClone = Object.keys(this.squares).reduce(
      (acc, key) => ({
        ...acc,
        [key]: this.squares[key].clone(),
      }),
      {}
    );
    const piecesClone = Object.keys(this.pieces).reduce(
      (acc, id) => ({
        ...acc,
        [id]: this.pieces[id].clone(),
      }),
      {}
    );
    return new Board(squaresClone, piecesClone, this.tokens);
  }

  resetTo(savePoint: Board): void {
    this.tokens = savePoint.tokens;
    Object.keys(this.squares).forEach((key) => {
      if (savePoint.squares[key] === undefined) delete this.squares[key];
    });
    Object.keys(savePoint.squares).forEach((key) => {
      if (this.squares[key] !== undefined) {
        this.squares[key].resetTo(savePoint.squares[key]);
      } else {
        this.squares = { ...this.squares, [key]: savePoint.squares[key].clone() };
      }
    });

    Object.keys(this.pieces).forEach((id) => {
      if (savePoint.pieces[id] === undefined) delete this.pieces[id];
    });
    Object.keys(savePoint.pieces).forEach((id) => {
      if (this.pieces[id] !== undefined) {
        this.pieces[id].resetTo(savePoint.pieces[id]);
      } else {
        this.pieces = { ...this.pieces, [id]: savePoint.pieces[id].clone() };
      }
    });
  }

  // TODO: consider making this a "property" or whatever it's called?
  getPieces(): Piece[] {
    return Object.values(this.pieces);
  }

  getPiecesByRule(rule: (p: Piece) => boolean): Piece[] {
    return this.getPieces().filter(rule);
  }

  piecesNotBelongingTo(player: Player): Piece[] {
    return this.getPiecesByRule((piece) => piece.owner !== player);
  }

  findPieceById(id: string): Piece | undefined {
    return this.pieces[id];
  }

  addSquare({ location, square }: { location: string; square: Square }): void {
    this.squares = { ...this.squares, [location]: square };
  }

  addSquares(squares: { location: string; square: Square }[] | undefined): void {
    squares?.forEach((s) => this.addSquare(s));
  }

  addAdjacenciesByRule(rule: ((square: Square) => Adjacency[]) | undefined): void {
    if (!rule) return;
    const locations = Object.keys(this.squares);
    const squares = Object.values(this.squares);
    squares.forEach((square) => {
      const desiredAdjacencies = rule(square);
      const newAdjacencies = desiredAdjacencies.filter((adjacency) =>
        locations.includes(adjacency.location)
      );
      square.addAdjacencies(newAdjacencies);
    });
  }

  addPiece(piece: Piece): void {
    this.pieces = { ...this.pieces, [piece.id]: piece };
  }

  addPiecesByRule(rule: (square: Square) => Piece[]): void {
    const squares = Object.values(this.squares);
    squares.forEach((square) => {
      rule(square).forEach((p) => {
        square.addPieces([p.id]);
        this.addPiece(p);
      });
    });
  }

  addPieceAt(piece: Piece, location: string): void {
    this.squareAt(location)?.addPieces([piece.id]);
    this.pieces = { ...this.pieces, [piece.id]: piece };
  }

  addPieceTokensByRule(rule: (piece: Piece) => Token[]): void {
    this.getPieces().forEach((piece) => piece.addTokens(rule(piece)));
  }

  // TODO: Extract next two methods as utility methods?
  rankAndFileBounds(): RankAndFileBounds {
    return this.rankAndFileBoundsWithFilter(() => true);
  }

  rankAndFileBoundsWithFilter(filter: (s: Square) => boolean): RankAndFileBounds {
    const squares = Object.values(this.squares).filter(filter);
    const ranks = squares.map((s) => s.coordinates.rank);
    const files = squares.map((s) => s.coordinates.file);
    return {
      minRank: ranks.length === 0 ? 0 : Math.min(...ranks),
      maxRank: ranks.length === 0 ? 0 : Math.max(...ranks),
      minFile: files.length === 0 ? 0 : Math.min(...files),
      maxFile: files.length === 0 ? 0 : Math.max(...files),
    };
  }

  firstSquareSatisfyingRule(condition: (s: Square) => boolean): Square | undefined {
    return Object.values(this.squares).find(condition);
  }

  displace({ pId, destination }: { pId: string; destination: string }): void {
    const startSquare = this.squareAt(this.pieces[pId].location);
    const endSquare = this.squareAt(destination);
    if (startSquare && endSquare) {
      startSquare.pieces = startSquare.pieces.filter((p) => p != pId);
      this.pieces[pId].location = destination;
      endSquare.pieces.push(pId);
    }
  }

  displacePieces(pieceDeltas: PieceDelta[]): void {
    pieceDeltas.forEach((pieceDelta) => {
      this.killPiecesAt(pieceDelta.destination);
      this.displace(pieceDelta);
    });
  }

  killPiecesAt(location: string): void {
    // This should actually move the pieces to a special square - to be taken care of when displaying dead pieces
    const square = this.squares[location];
    this.pieces = Object.keys(this.pieces)
      .filter((id: string) => !square.pieces.includes(id))
      .reduce(
        (acc, id) => ({
          ...acc,
          [id]: this.pieces[id],
        }),
        {}
      );
    square.pieces = [];
  }

  squareAt(location?: string): Square | undefined {
    return location ? this.squares[location] : undefined;
  }

  go({ from, path }: { from: string; path: Direction[] }): Square[] {
    let currentSquares = [this.squareAt(from)];

    path.forEach((direction) => {
      currentSquares = currentSquares.flatMap((square) =>
        square?.go(direction).map((location) => this.squareAt(location))
      );
    });

    return currentSquares.filter(isPresent);
  }

  static createEmptyBoard(): Board {
    return new Board({});
  }

  static createBoard(interrupt: CompactRules): Board {
    let board = new Board();

    ({ board } = interrupt.for.forSquareGenerationModify({ board }));
    ({ board } = interrupt.for.onBoardCreatedModify({ board }));

    return board;
  }

  squareHasPieceBelongingTo(square: Square, owner: Player): boolean {
    return square.pieces.some((pId) => this.pieces[pId].owner === owner);
  }

  squareHasPieceNotBelongingTo(square: Square, owner: Player): boolean {
    return square.pieces.some((pId) => this.pieces[pId].owner !== owner);
  }

  findPiecesOnSquareByRule(square: Square, rule: (p: Piece) => boolean): Piece[] {
    return Object.values(this.pieces)
      .filter((p) => square.pieces.some((pId) => p.id === pId))
      .filter(rule);
  }
}

export { Board };
