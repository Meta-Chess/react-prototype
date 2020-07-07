import { Piece } from "./Piece";

export class Square {
  constructor(
    private adjacencies: Adjacencies,
    private pieces: Piece[],
    private attributes: SquareAttributes
  ) {}
}
