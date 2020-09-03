import { Piece } from "./Piece";
import { Square } from "./Square";
import { Adjacency } from "./Adjacencies";
import { TokenOwner } from "./TokenOwner";
import { Direction, PieceDelta, RankAndFileBounds, Rule, Token } from "game/types";
import { applyInSequence, isPresent } from "utilities";

interface LocationMap {
  [key: string]: Square;
}

// TODO: This class is too long!
class Board extends TokenOwner {
  constructor(public squares: LocationMap = {}, public tokens: Token[] = []) {
    super(tokens);
  }

  // TODO: consider making this a "get" method?
  pieces(): Piece[] {
    return Object.values(this.squares)
      .map((square) => square.pieces)
      .flat();
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

  addPiecesByRule(rule: (square: Square) => Piece[]): void {
    const squares = Object.values(this.squares);
    squares.forEach((square) => {
      square.addPieces(rule(square));
    });
  }

  addPieceTokensByRule(rule: (piece: Piece) => Token[]): void {
    this.pieces().forEach((piece) => piece.addTokens(rule(piece)));
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

  displace({ piece, destination }: { piece: Piece; destination: string }): void {
    const startSquare = this.squareAt(piece.location);
    const endSquare = this.squareAt(destination);
    if (startSquare && endSquare) {
      startSquare.pieces = startSquare.pieces.filter((p) => p.id != piece.id);
      piece.location = destination;
      endSquare.pieces.push(piece);
    }
  }

  displacePieces(pieceDeltas: PieceDelta[]): void {
    pieceDeltas.forEach((pieceDelta) => {
      this.killPiecesAt(pieceDelta.destination);
      this.displace(pieceDelta);
    });
  }

  killPiecesAt(location: string): void {
    // TODO: This should actually move the pieces to a special square
    this.squares[location].pieces = [];
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

  static createBoard(rules: Rule[]): Board {
    let board = new Board();

    ({ board } = applyInSequence(
      rules.map((r) => r?.forSquareGenerationModify),
      { board }
    ));

    ({ board } = applyInSequence(
      rules.map((r) => r?.onBoardCreatedModify),
      { board }
    ));

    return board;
  }
}

export { Board };
