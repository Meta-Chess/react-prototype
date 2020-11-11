import { Colors } from "primitives";

export type TraitClasses = keyof typeof traitColors;

export const traitColors = {
  piece: Colors.TRAIT_CLASS.PIECE,
  restriction: Colors.TRAIT_CLASS.RESTRICTION,
  ability: Colors.TRAIT_CLASS.ABILITY,
  "game end": Colors.TRAIT_CLASS.GAME_END,
  interaction: Colors.TRAIT_CLASS.INTERACTION,
  geometry: Colors.TRAIT_CLASS.GEOMETRY,
  world: Colors.TRAIT_CLASS.WORLD,
};
