import { Piece } from "./Piece";
import { Adjacencies, Adjacency } from "./Adjacencies";
import { Player } from "domain/Game/types";

interface Coordinates {
  rank: number;
  file: number;
}

export class Square {
  constructor(
    public location: string,
    public coordinates: Coordinates, // TODO: Generalise coordinates to accept things other than rank and file
    public pieces: Piece[] = [],
    public adjacencies: Adjacencies = new Adjacencies(),
    public attributes?: null // This will be more interesting later...
  ) {}

  getPieceArray(): Piece[] {
    return this.pieces;
  }

  addPieces(pieces: Piece[]): void {
    this.pieces = [...this.pieces, ...pieces];
  }

  addAdjacencies(adjacencies: Adjacency[]): void {
    this.adjacencies.addAdjacencies(adjacencies);
  }

  getCoordinates(): Coordinates {
    return this.coordinates;
  }

  hasPiece(): boolean {
    return this.pieces.length !== 0;
  }

  hasPieceBelongingTo(owner: Player): boolean {
    return this.pieces.some((piece) => piece.owner === owner);
  }

  hasPieceNotBelongingTo(owner: Player): boolean {
    return this.pieces.some((piece) => piece.owner !== owner);
  }

  getColorIndex(): number {
    return (this.coordinates.rank + this.coordinates.file) % 2;
  }
}
