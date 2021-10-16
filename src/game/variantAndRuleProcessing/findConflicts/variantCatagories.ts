import { FutureVariantName } from "game/variants";

export type VariantCatagories = {
  [group in string]: FutureVariantName[];
};

export const VARIANT_CATAGORIES: VariantCatagories = {
  triggersCheckCaringAboutPassiveMoves: ["chemicallyExcitedKnight"],
  heapsOfPassiveMoves: ["crazyhouse"],
  highComputationalFreedom: ["kleinBottle", "toroidal", "mobius", "hex"],
  boardCantHavePoles: ["hex", "toroidal", "mobius", "kleinBottle", "circular"],
  boardHasPoles: ["polar", "spherical"],
  boardCantBeLong: ["hex"],
  boardIsLong: ["toroidal", "mobius", "kleinBottle", "circular"],
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
  overrideCylinderOnCircular: ["circular", "cylindrical"],
};
