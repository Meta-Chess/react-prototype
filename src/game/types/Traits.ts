import { Colors } from "primitives";

export type TraitClasses = keyof typeof traitInfo;

export const traitInfo = {
  piece: { name: "Piece", color: Colors.TRAIT_CLASS.PIECE },
  restriction: { name: "Restriction", color: Colors.TRAIT_CLASS.RESTRICTION },
  ability: { name: "Ability", color: Colors.TRAIT_CLASS.ABILITY },
  "game end": { name: "Game End", color: Colors.TRAIT_CLASS.GAME_END },
  interaction: { name: "Interaction", color: Colors.TRAIT_CLASS.INTERACTION },
  geometry: { name: "Geometry", color: Colors.TRAIT_CLASS.GEOMETRY },
  world: { name: "Terraform", color: Colors.TRAIT_CLASS.WORLD },
};
