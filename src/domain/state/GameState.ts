import { Variant } from "domain/state/Variants";

export class GameState {
  constructor(
    private pieces: Piece[],
    private squares: Square[],
    private variants: Variant[],
    private format: Format
  ) // private history: GameHistory
  {}
}

import { Piece } from "./Piece";
import { Square } from "./Square";

enum Format {
  default,
}
