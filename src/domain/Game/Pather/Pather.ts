import { Piece } from "../Board";
import { Player } from "../types";

export class Pather {
  constructor() {
    // TODO: add variants
  }
  path(piece: Piece): string[] {
    if (piece.owner == Player.White) {
      return ["R5F4"];
    } else {
      return ["R5F5"];
    }
  }
}
