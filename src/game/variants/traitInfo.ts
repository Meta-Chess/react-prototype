import { Colors } from "primitives";

export type TraitName = keyof typeof traitInfo;

export const traitInfo = {
  Piece: { color: Colors.TRAIT.PIECE },
  Restrict: { color: Colors.TRAIT.RESTRICT },
  Ability: { color: Colors.TRAIT.ABILITY },
  "Game End": { color: Colors.TRAIT.GAME_END },
  "New Phase": { color: Colors.TRAIT.NEW_PHASE },
  Geometry: { color: Colors.TRAIT.GEOMETRY },
  Terraform: { color: Colors.TRAIT.TERRAFORM },
};
