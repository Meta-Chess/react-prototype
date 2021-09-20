import { Colors } from "primitives";
import { keys } from "utilities/keys";

export type TraitName = keyof typeof traitInfo;

export const traitInfo = {
  Restriction: {
    color: Colors.TRAIT.RESTRICTION,
    description: "Piece movement is restricted",
  },
  Reaction: {
    color: Colors.TRAIT.REACTION,
    description: "A new mechanic",
  },
  Ending: {
    color: Colors.TRAIT.ENDING,
    description: "The game can end for a player in a new way",
  },
  Movement: {
    color: Colors.TRAIT.MOVEMENT,
    description: "Changes are made to regular turn structure",
  },
  Geometry: {
    color: Colors.TRAIT.GEOMETRY,
    description: "Changes are made to how squares connect with each other",
  },
  Special: {
    color: Colors.TRAIT.SPECIAL,
    description: "Changes are made to how squares connect with each other",
  },
};

export const allTraitNames = keys<TraitName>(traitInfo);
