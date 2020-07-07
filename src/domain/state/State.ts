import { Piece } from "./Piece";
import { Square } from "./Square";
import { Variant } from "domain/state/Variants";

export class State {
  constructor(
    private pieces: Piece[],
    private squares: Square[],
    private variants: Variant[],
    private format: Format
  ) // private history: GameHistory
  {}
}

enum Format {
  default,
}
