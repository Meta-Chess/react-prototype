import { Colors } from "primitives";

export type TraitName = keyof typeof traitInfo;

export const traitInfo = {
  Piece: { color: Colors.TRAIT.PIECE },
  Restriction: { color: Colors.TRAIT.RESTRICTION },
  Ability: { color: Colors.TRAIT.ABILITY },
  Ending: { color: Colors.TRAIT.ENDING },
  Phase: { color: Colors.TRAIT.PHASE },
  Geometry: { color: Colors.TRAIT.GEOMETRY },
  Board: { color: Colors.TRAIT.BOARD },
};
