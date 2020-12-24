import { Colors } from "primitives";

export type TraitClass = keyof typeof traitInfo;

export const traitInfo = {
  piece: { name: "Piece", color: Colors.TRAIT_CLASS.PIECE },
  restrict: { name: "Restrict", color: Colors.TRAIT_CLASS.RESTRICT },
  ability: { name: "Ability", color: Colors.TRAIT_CLASS.ABILITY },
  "game end": { name: "Game End", color: Colors.TRAIT_CLASS.GAME_END },
  "new phase": { name: "New Phase", color: Colors.TRAIT_CLASS.NEW_PHASE },
  geometry: { name: "Geometry", color: Colors.TRAIT_CLASS.GEOMETRY },
  terraform: { name: "Terraform", color: Colors.TRAIT_CLASS.TERRAFORM },
};
