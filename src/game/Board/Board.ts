import { Piece } from "./Piece";
import { Square } from "./Square";
import { Adjacency } from "./Adjacencies";
import { TokenOwner } from "./TokenOwner";
import {
  defaultRegions,
  Direction,
  PlayerName,
  RankAndFileBounds,
  Region,
  Regions,
  SquareShape,
  Token,
  TokenName,
  WithOptional,
} from "game/types";
import { LocationPrefix, SpecialLocation } from "./location";
import { isPresent, typecastKeys } from "utilities";
import { CompactRules } from "game/CompactRules/CompactRules";
import { IdGenerator } from "utilities/IdGenerator";
import { Move, PieceDelta } from "game/Move";
import { clone } from "lodash";
import { EventCenter } from "game/EventCenter";
import { invisibilityToken } from "game/CompactRules/constants";
import { PieceStatus, pieceStatusRules } from "./PieceStatus";

interface LocationMap {
  [location: string]: Square;
}

interface PieceIdMap {
  [id: string]: Piece;
}

// TODO: This class is too long!
class Board extends TokenOwner {
  private idGenerator: IdGenerator;

  // todo: we want to start thinking about a general store for these properties
  private regions: Regions = defaultRegions;
  private clockwiseDirections: Direction[] = [];

  constructor(
    public interrupt: CompactRules,
    public events: EventCenter,
    public squares: LocationMap = {},
    public pieces: PieceIdMap = {},
    public tokens: Token[] = []
  ) {
    super(tokens);
    this.idGenerator = new IdGenerator();
  }

  clone(): Board {
    const squaresClone = typecastKeys(this.squares).reduce(
      (acc, key) => ({
        ...acc,
        [key]: this.squares[key].clone(),
      }),
      {}
    );
    const piecesClone = typecastKeys(this.pieces).reduce(
      (acc, id) => ({
        ...acc,
        [id]: this.pieces[id].clone(),
      }),
      {}
    );
    const cloneConstructorInput: Required<ConstructorParameters<typeof Board>> = [
      this.interrupt.clone(),
      this.events.clone(),
      squaresClone,
      piecesClone,
      this.cloneTokens(this.tokens),
    ];
    return new Board(...cloneConstructorInput);
  }

  resetTo(savePoint: Board): void {
    this.interrupt.resetTo(savePoint.interrupt);
    this.events.resetTo(savePoint.events);
    this.tokens = clone(savePoint.tokens);
    typecastKeys(this.squares).forEach((key) => {
      if (savePoint.squares[key] === undefined) delete this.squares[key];
    });
    typecastKeys(savePoint.squares).forEach((key) => {
      if (this.squares[key] !== undefined) {
        this.squares[key].resetTo(savePoint.squares[key]);
      } else {
        this.squares = { ...this.squares, [key]: savePoint.squares[key].clone() };
      }
    });

    typecastKeys(this.pieces).forEach((id) => {
      if (savePoint.pieces[id] === undefined) delete this.pieces[id];
    });
    typecastKeys(savePoint.pieces).forEach((id) => {
      if (this.pieces[id] !== undefined) {
        this.pieces[id].resetTo(savePoint.pieces[id]);
      } else {
        this.pieces = { ...this.pieces, [id]: savePoint.pieces[id].clone() };
      }
    });
  }

  private pieceHasStatus(piece: Piece, status: PieceStatus): boolean {
    return pieceStatusRules[status](piece);
  }

  getPieces(statuses: PieceStatus[] = [PieceStatus.NotGraveyard]): Piece[] {
    return Object.values(this.pieces).filter((piece) =>
      statuses.every((status) => this.pieceHasStatus(piece, status))
    );
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

  getPiecesAt(location?: string): Piece[] {
    let pieces: Piece[] = [];
    this.squareAt(location)?.pieces.forEach((id) => {
      pieces = pieces.concat(this.pieces[id]);
    });
    return pieces;
  }

  getEnemyPiecesAt(location?: string, player?: PlayerName): Piece[] {
    if (location === undefined || player === undefined) return [];
    else return this.getPiecesAt(location).filter((p) => p.owner !== player);
  }

  getLocations(): string[] {
    return typecastKeys<string>(this.squares);
  }

  isLocationGraveyard(location: string): boolean {
    return location.slice(0, 1) === SpecialLocation.graveyard;
  }

  getSquares(includeGraveyards = false): Square[] {
    return includeGraveyards
      ? Object.values(this.squares)
      : Object.values(this.squares).filter(
          (square) => square.location.charAt(0) !== LocationPrefix.graveyard
        );
  }

  addSquare({ location, square }: { location: string; square: Square }): void {
    this.squares = { ...this.squares, [location]: square };
  }

  addSquares(squares: { location: string; square: Square }[] | undefined): void {
    squares?.forEach((s) => this.addSquare(s));
  }

  defineRegion(
    region: Region,
    squareLocations: string[],
    player: PlayerName | "default" = "default"
  ): void {
    this.regions[region][player] = squareLocations;
  }

  defineClockwiseDirections(directions: Direction[]): void {
    this.clockwiseDirections = directions;
  }

  getRegionLocations(
    region: Region,
    player: PlayerName | "default" = "default"
  ): string[] {
    return this.regions[region][player] || [];
  }

  getRegion(region: Region, player: PlayerName | "default" = "default"): Square[] {
    return this.getRegionLocations(region, player)
      .map((loc) => this.squareAt(loc))
      .filter(isPresent);
  }

  squareInRegion(
    square: Square,
    region: Region,
    player: PlayerName | "default" = "default"
  ): boolean {
    return this.getRegionLocations(region, player).some(
      (regionLocation) => square.getLocation() === regionLocation
    );
  }

  getClockwiseDirections(): Direction[] {
    return this.clockwiseDirections;
  }

  addAdjacenciesByRule(rule: ((square: Square) => Adjacency[]) | undefined): void {
    if (!rule) return;
    const locations = typecastKeys(this.squares);
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

  displacePieces(move: WithOptional<Move, "pieceId">): void {
    move.pieceDeltas.forEach((pieceDelta) => {
      this.displace(pieceDelta);
    });
    move.captures?.forEach((capture) => {
      this.capturePieces(capture.pieceIds, capture.capturer);
      this.events.notify({
        name: "capture",
        data: {
          board: this,
          square: this.squares[capture.at],
        },
      });
    });
  }

  capturePieces(capturedPieceIds: string[], mover: PlayerName): void {
    capturedPieceIds.forEach((pieceId) => this.killPiece(pieceId, mover, true));
  }

  killPiece(pieceId: string, mover?: PlayerName, captured = false): void {
    const piece = this.getPiece(pieceId);
    const square = this.squareAt(piece?.location);

    if (!piece || !square) return;
    const { destination } = this.interrupt.for.onSendPieceToGrave({
      piece,
      mover,
      captured,
      destination: SpecialLocation.graveyard,
    });

    square.pieces = square.pieces.filter((pId) => pId !== pieceId);
    this.squareAt(destination)?.addPieces([pieceId]);
    piece.location = destination;
  }

  killPiecesAt({
    piecesLocation,
    mover,
    captured = false,
  }: {
    piecesLocation: string;
    mover?: PlayerName;
    captured?: boolean;
  }): void {
    this.squareAt(piecesLocation)?.pieces.forEach((p) =>
      this.killPiece(p, mover, captured)
    );
  }

  destroySquare(location: string): void {
    this.killPiecesAt({ piecesLocation: location });
    delete this.squares[location];
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

  static createBoard(
    interrupt: CompactRules,
    events: EventCenter,
    numberOfPlayers = 2
  ): Board {
    let board = new Board(interrupt, events);

    ({ board } = interrupt.for.forSquareGenerationModify({ board, numberOfPlayers }));
    ({ board } = interrupt.for.onBoardCreate({ board, numberOfPlayers }));
    ({ board } = interrupt.for.afterBoardCreation({ board }));

    //graveyard storage for all pieces
    const graveyardLocation = SpecialLocation.graveyard;
    board.addSquare({
      location: graveyardLocation,
      square: new Square(
        graveyardLocation,
        { rank: 999, file: 999 },
        [],
        [invisibilityToken]
      ),
    });

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

  setVisualShapeToken(tokenName: SquareShape): void {
    const boardShapeToken = {
      name: TokenName.Shape,
      expired: (): boolean => {
        return false;
      },
      data: { shape: tokenName },
    };

    this.removeTokensByName(TokenName.Shape);
    this.addToken(boardShapeToken);
  }
}

export { Board };
