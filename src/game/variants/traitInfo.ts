import { Colors } from "primitives";

export type TraitName = keyof typeof traitInfo;

export const traitInfo = {
  Piece: { color: Colors.TRAIT.PIECE },
  Restrict: { color: Colors.TRAIT.RESTRICT },
  Ability: { color: Colors.TRAIT.ABILITY },
  "Game End": { color: Colors.TRAIT.GAME_END },
  Phase: { color: Colors.TRAIT.PHASE },
  Geometry: { color: Colors.TRAIT.GEOMETRY },
  Board: { color: Colors.TRAIT.BOARD },
};
