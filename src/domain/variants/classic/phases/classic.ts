import { Phase } from "domain/gamePhase";
import { whiteSelect } from "./whiteSelectPhase";
import { whiteMove } from "./whiteMovePhase";
import { whitePromotion } from "./whitePromotionPhase";
import { blackSelect } from "./blackSelectPhase";
import { blackMove } from "./blackMovePhase";
import { blackPromotion } from "./blackPromotionPhase";

export const classic = {
  [Phase.WhiteSelect]: whiteSelect,
  [Phase.WhiteMove]: whiteMove,
  [Phase.WhitePromotion]: whitePromotion,
  [Phase.BlackSelect]: blackSelect,
  [Phase.BlackMove]: blackMove,
  [Phase.BlackPromotion]: blackPromotion,
};
