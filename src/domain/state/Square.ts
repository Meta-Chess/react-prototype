import { Piece } from "./Piece";
import { Direction } from "./Direction";

export class Square {
  constructor(
    private adjacencies: Adjacencies,
    private pieces: Piece[],
    private attributes: object
  ) {}
}

type Adjacencies = {
  bar?: Square[];
  foo?: Square[];
};
