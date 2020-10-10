import { Piece } from "./Piece";
import { Adjacencies, Adjacency } from "./Adjacencies";
import { Direction, Token } from "game/types";
import { TokenOwner } from "./TokenOwner";
import { clone } from "lodash";

interface Coordinates {
  rank: number;
  file: number;
}

// TODO: move to utilities
export function resetArrayTo<T>(a: Array<T>, b: Array<T>): void {
  a.length = b.length;
  for (let i = 0; i < a.length; i++) {
    a[i] = b[i];
  }
}

export class Square extends TokenOwner {
  constructor(
    public location: string,
    public coordinates: Coordinates,
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
      clone(this.tokens),
      this.adjacencies.clone(),
      clone(this.pieces)
    );
  }

  resetTo(savePoint: Square): void {
    this.location = savePoint.location;
    this.coordinates.rank = savePoint.coordinates.rank;
    this.coordinates.file = savePoint.coordinates.file;
    resetArrayTo(this.tokens, savePoint.tokens);
    this.adjacencies.resetTo(savePoint.adjacencies);
    resetArrayTo(this.pieces, savePoint.pieces);
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
