import { Piece } from "./Piece";
import { Square } from "./Square";
import { Adjacency } from "./Adjacencies";
import { TokenOwner } from "./TokenOwner";
import {
  Direction,
  RankAndFileBounds,
  Token,
  PlayerName,
  Region,
  Regions,
} from "game/types";
import { isPresent } from "utilities";
import { CompactRules } from "game/Rules/Rules";
import { IdGenerator } from "utilities/IdGenerator";
import { PieceDelta } from "game/Move";
import { AnimationHandler } from "./AnimationHandler";

interface LocationMap {
  [location: string]: Square;
}

interface PieceIdMap {
  [id: string]: Piece;
}

// TODO: This class is too long!
class Board extends TokenOwner {
  private idGenerator: IdGenerator;
  private regions: Regions = {};

  constructor(
    public interrupt: CompactRules,
    public squares: LocationMap = {},
    public pieces: PieceIdMap = {},
    public tokens: Token[] = [],
    public animationHandler: AnimationHandler = new AnimationHandler()
  ) {
    super(tokens);
    this.idGenerator = new IdGenerator();
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
    //TODO: actually clone rules
    return new Board(this.interrupt, squaresClone, piecesClone, this.tokens);
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

  getPieces(): Piece[] {
    return Object.values(this.pieces);
  }

  getPiece(pieceId: string): Piece | undefined {
    return this.pieces[pieceId];
  }

  getPiecesByRule(rule: (p: Piece) => boolean): Piece[] {
    return this.getPieces().filter(rule);
  }

  piecesNotBelongingTo(player: PlayerName): Piece[] {
    return this.getPiecesByRule((piece) => piece.owner !== player);
  }

  piecesBelongingTo(player: PlayerName): Piece[] {
    return this.getPiecesByRule((piece) => piece.owner === player);
  }

  findPieceById(id: string): Piece | undefined {
    return this.pieces[id];
  }

  getPiecesAt(location: string): Piece[] {
    let pieces: Piece[] = [];
    this.squareAt(location)?.pieces.forEach((id) => {
      pieces = pieces.concat(this.pieces[id]);
    });
    return pieces;
  }

  getLocations(): string[] {
    return Object.keys(this.squares);
  }

  addSquare({ location, square }: { location: string; square: Square }): void {
    this.squares = { ...this.squares, [location]: square };
  }

  addSquares(squares: { location: string; square: Square }[] | undefined): void {
    squares?.forEach((s) => this.addSquare(s));
  }

  defineRegion(region: Region, squareLocations: string[]): void {
    this.regions[region] = squareLocations;
  }

  getRegion(region: Region): Square[] {
    return (this.regions[region] || [])
      .map((loc) => this.squareAt(loc))
      .filter(isPresent);
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

  addPiece({
    piece,
    square,
    location,
  }: {
    piece: Piece;
    square?: Square;
    location?: string;
  }): void {
    const pieceId = this.idGenerator.getId().toString(36);
    square = square || this.squareAt(location);
    if (!square) throw new Error("Must specify either square or location to add piece");
    square.addPieces([pieceId]);
    piece.id = pieceId;
    piece.location = square.location;
    this.pieces = { ...this.pieces, [pieceId]: piece };
  }

  addPiecesByRule(rule: (square: Square) => Piece[]): void {
    const squares = Object.values(this.squares);
    squares.forEach((square) => {
      rule(square).forEach((piece) => {
        this.addPiece({ piece, square });
      });
    });
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

  displace(delta: PieceDelta): void {
    const { pieceId, path } = delta;
    const startSquare = this.squareAt(this.pieces[pieceId].location);
    const endSquare = this.squareAt(path.getEnd());
    if (startSquare && endSquare) {
      startSquare.pieces = startSquare.pieces.filter((p) => p != pieceId);
      this.pieces[pieceId].location = path.getEnd();
      endSquare.pieces.push(pieceId);
    }
    this.interrupt.for.onPieceDisplaced({ board: this, pieceDelta: delta });
  }

  displacePieces(pieceDeltas: PieceDelta[]): void {
    pieceDeltas.forEach((pieceDelta) => {
      const captureHappened = this.capturePiecesAt(
        pieceDelta.path.getEnd(),
        this.pieces[pieceDelta.pieceId]
      );
      this.displace(pieceDelta);
      if (captureHappened) {
        this.interrupt.for.postCapture({
          board: this,
          square: this.squares[pieceDelta.path.getEnd()],
        });
      }
    });
  }

  capturePiecesAt(location: string, piece: Piece): boolean {
    let captureHappened = (this.squareAt(location)?.pieces.length || 0) > 0;
    this.killPiecesAt(location);

    ({ captureHappened } = this.interrupt.for.onCapture({
      board: this,
      piece,
      location,
      captureHappened,
    }));

    return captureHappened;
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

  static createBoard(interrupt: CompactRules): Board {
    let board = new Board(interrupt);

    ({ board } = interrupt.for.forSquareGenerationModify({ board }));
    ({ board } = interrupt.for.onBoardCreate({ board }));
    ({ board } = interrupt.for.afterBoardCreation({ board }));

    return board;
  }

  squareHasPieceBelongingTo(square: Square, owner: PlayerName): boolean {
    return square.pieces.some((pId) => this.pieces[pId].owner === owner);
  }

  squareHasPieceNotBelongingTo(square: Square, owner: PlayerName): boolean {
    return square.pieces.some((pId) => this.pieces[pId].owner !== owner);
  }

  findPiecesOnSquareByRule(square: Square, rule: (p: Piece) => boolean): Piece[] {
    return Object.values(this.pieces)
      .filter((p) => square.pieces.some((pId) => p.id === pId))
      .filter(rule);
  }

  killPiece(pieceId: string): void {
    this.pieces = Object.keys(this.pieces)
      .filter((id: string) => !(id === pieceId))
      .reduce(
        (acc, id) => ({
          ...acc,
          [id]: this.pieces[id],
        }),
        {}
      );
  }
}

export { Board };
