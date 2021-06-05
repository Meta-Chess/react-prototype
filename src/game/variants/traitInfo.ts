import { Colors } from "primitives";
import { keys } from "utilities/keys";

export type TraitName = keyof typeof traitInfo;

export const traitInfo = {
  Piece: {
    color: Colors.TRAIT.PIECE,
    description: "Variant applies only to a particular type of piece",
  },
  Restriction: {
    color: Colors.TRAIT.RESTRICTION,
    description: "Piece movement is restricted",
  },
  Ability: {
    color: Colors.TRAIT.ABILITY,
    description: "A new mechanic",
  },
  Ending: {
    color: Colors.TRAIT.ENDING,
    description: "The game can end for a player in a new way",
  },
  Phase: {
    color: Colors.TRAIT.PHASE,
    description: "Changes are made to regular turn structure",
  },
  Geometry: {
    color: Colors.TRAIT.GEOMETRY,
    description: "Changes are made to how squares connect with each other",
  },
  Board: {
    color: Colors.TRAIT.BOARD,
    description: "A different board will be in play from the start of the game",
  },
};

export const allTraitNames = keys<TraitName>(traitInfo);
