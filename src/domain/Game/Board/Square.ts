import { Piece } from "./Piece";
import { Adjacencies } from "domain/Game/types";

export class Square {
  constructor(
    public adjacencies: Adjacencies,
    public pieces: Piece[],
    public location: string,
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