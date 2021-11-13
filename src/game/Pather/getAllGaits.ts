import { CompactRules, Game, Piece } from "game";
import { Gait } from "../types";

export function getAllGaits(interrupt: CompactRules, game: Game, piece: Piece): Gait[] {
  return interrupt.for.onGaitsGeneratedModify({
    game: game,
    gaits: piece.generateGaits(),
    piece: piece,
  }).gaits;
}
