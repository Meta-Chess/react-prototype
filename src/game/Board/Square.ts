import { Piece } from "./Piece";
import { Adjacencies, Adjacency } from "./Adjacencies";
import { Direction, Token, AccessMarker } from "game/types";
import { TokenOwner } from "./TokenOwner";
import { clone } from "lodash";
import { resetArrayTo } from "utilities";

export interface Coordinates {
  rank: number;
  file: number;
}

export class Square extends TokenOwner {
  constructor(
    public location: string,
    public coordinates: Coordinates,
    public whiteListedMarkers: AccessMarker[] = [AccessMarker.Normal],
    public tokens: Token[] = [],
    public adjacencies: Adjacencies = new Adjacencies(),
    public pieces: string[] = []
  ) {
    super(tokens);
  }

  clone(): Square {
    return new Square(
      this.location,
      clone(this.coordinates),
      clone(this.whiteListedMarkers),
      clone(this.tokens),
      this.adjacencies.clone(),
      clone(this.pieces)
    );
  }

  resetTo(savePoint: Square): void {
    this.location = savePoint.location;
    this.coordinates.rank = savePoint.coordinates.rank;
    this.coordinates.file = savePoint.coordinates.file;
    resetArrayTo({ from: this.whiteListedMarkers, to: savePoint.whiteListedMarkers });
    resetArrayTo({ from: this.tokens, to: savePoint.tokens });
    this.adjacencies.resetTo(savePoint.adjacencies);
    resetArrayTo({ from: this.pieces, to: savePoint.pieces });
  }

  go(direction: Direction): string[] {
    return this.adjacencies.go(direction);
  }

  addPieces(piecesIds: string[]): void {
    this.pieces = [...this.pieces, ...piecesIds];
  }

  addAdjacencies(adjacencies: Adjacency[]): void {
    this.adjacencies.addAdjacencies(adjacencies);
  }

  getCoordinates(): Coordinates {
    return this.coordinates;
  }

  getLocation(): string {
    return this.location;
  }

  hasPiece(): boolean {
    return this.pieces.length !== 0;
  }

  hasPieceOf(pieces: Piece[]): boolean {
    const ids = pieces.map((p) => p.id);
    return this.pieces.some((pId) => ids.includes(pId));
  }
}
