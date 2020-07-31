import { Piece } from "./Piece";
import { Adjacencies } from "domain/State/types";

export class Square {
  constructor(
    public adjacencies: Adjacencies,
    public pieces: Piece[],
    public coordinates: { rank: number; file: number }, // TODO: Generalise coordinates to accept things other than rank and file
    public attributes?: null // This will be more interesting later...
  ) {}

  getPieceArray(): Piece[] {
    return this.pieces;
  }

  getColorIndex(): number {
    return (this.coordinates.rank + this.coordinates.file) % 2;
  }
}
