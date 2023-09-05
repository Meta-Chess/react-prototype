import { FutureVariantName, futureVariants } from "game/variants";
import { keys } from "utilities";

export type VariantCatagories = {
  [group in string]: FutureVariantName[];
};

const BOARD_IS_LONG = keys(futureVariants).filter((variantName) =>
  futureVariants[variantName].ruleNames.includes("longBoard")
);

export const VARIANT_CATAGORIES: VariantCatagories = {
  triggersCheckCaringAboutPassiveMoves: ["chemicallyExcitedKnight"],
  heapsOfPassiveMoves: ["crazyhouse"],
  highComputationalFreedom: ["kleinBottle", "toroidal", "mobius", "hex", "grandChess"],
  boardCantHavePoles: ["hex", "toroidal", "mobius", "kleinBottle"],
  boardHasPoles: ["polar", "spherical"],
  boardCantBeLong: ["hex"],
  boardIsLong: BOARD_IS_LONG,
  mutuallyExclusiveBoardSetups: ["capablancaChess", "grandChess", "hex"],
  noFork: ["noFork"],
  thatCanMakeNoForkStalemate: ["fatigue"],
  combinatoricHexCylinderPull: ["hex", "cylindrical", "pull"],
  volitile: ["atomic", "chainReaction"],
  degreesOfFreedom: [
    "spherical",
    "cylindrical",
    "pull",
    "crazyhouse",
    "toroidal",
    "kleinBottle",
    "mobius",
  ],
};
