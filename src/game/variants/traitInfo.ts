import { Colors } from "primitives";
import { keys } from "utilities/keys";

export type TraitName = keyof typeof traitInfo;

export const traitInfo = {
  Restriction: {
    color: Colors.TRAIT.RESTRICTION,
    description: "Variants that restrict what the player can do",
  },
  Reaction: {
    color: Colors.TRAIT.REACTION,
    description: "Variants that trigger in response to some event",
  },
  Ending: {
    color: Colors.TRAIT.ENDING,
    description: "Variants that change how the game can end",
  },
  Movement: {
    color: Colors.TRAIT.MOVEMENT,
    description: "Variants that modify the way pieces move",
  },
  Board: {
    color: Colors.TRAIT.BOARD,
    description: "Variants that modify the underlying board",
  },
  Simulation: {
    color: Colors.TRAIT.SIMULATION,
    description: "Variants that involve simulation of future game states",
  },
};

export const traitOrder: TraitName[] = [
  "Board",
  "Movement",
  "Reaction",
  "Restriction",
  "Ending",
  "Simulation",
];

export const allTraitNames = keys<TraitName>(traitInfo);
