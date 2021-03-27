import { RuleName } from "../rules";
import * as VariantImages from "primitives/VariantImage";
import { TraitName } from "game/variants/traitInfo";

export const integrateWithOtherRules: {
  [key in RuleName]?: (rules: RuleName[]) => RuleName[];
} = {
  cylindrical: (ruleNames: RuleName[]): RuleName[] => {
    return ruleNames.includes("hex") ? ["hexCylindrical"] : ["cylindrical"];
  },
  standard: (rules: RuleName[]): RuleName[] => {
    return rules.includes("hex") || rules.includes("longBoard") ? [] : ["standard"];
  },
};

interface Variant {
  title: string;
  description: string;
  ruleNames: RuleName[];
}

export type VariantName =
  | "chess"
  | "cylindrical"
  | "spherical"
  | "hex"
  | "toroidal"
  | "mobius";

export const variants: { [name in VariantName]: Variant } = {
  chess: {
    title: "Chess",
    description: "Your usual bog-standard game of chess",
    ruleNames: [
      "standard",
      "loseWithNoKings",
      "pawnDoubleStep",
      "castling",
      "interception",
      "promotion",
      "stalemate",
    ],
  },
  cylindrical: {
    title: "Cylindrical Chess",
    description: "Chess on a Cylinder! You can move through the sides of the board.",
    ruleNames: [
      "standard",
      "loseWithNoKings",
      "pawnDoubleStep",
      "cylindrical",
      "castling",
      "interception",
      "promotion",
      "stalemate",
    ],
  },
  spherical: {
    title: "Spherical Chess",
    description:
      "Chess on a sphere! You can move through the sides like you're on a cylinder, and through the top and bottom as if they were the poles of a sphere.",
    ruleNames: [
      "standard",
      "loseWithNoKings",
      "pawnDoubleStep",
      "cylindrical",
      "polar",
      "castling",
      "interception",
      "promotion",
      "stalemate",
    ],
  },
  hex: {
    title: "Hex Chess",
    description:
      "Chess but with hexagons instead of squares. Watch out for the sneaky bishops.",
    ruleNames: [
      "hex",
      "loseWithNoKings",
      "pawnDoubleStep",
      "castling",
      "interception",
      "promotion",
    ],
  },
  toroidal: {
    title: "Toroidal Chess",
    description:
      "Chess on a torus! You can move through any edge onto the opposite edge.",
    ruleNames: [
      "longBoard",
      "cylindrical",
      "verticallyCylindrical",
      "loseWithNoKings",
      "pawnDoubleStep",
      "castling",
      "interception",
      "promotion",
      "stalemate",
    ],
  },
  mobius: {
    title: "Möbius Chess",
    description:
      "Chess on a Möbius strip! You can move through the top and bottom edges, and you can see the pieces on the opposite side of the strip!",
    ruleNames: [
      "mobius",
      "passiveMoveThroughBoard",
      "longBoard",
      "verticallyCylindrical",
      "loseWithNoKings",
      "pawnDoubleStep",
      "castling",
      "interception",
      "promotion",
      "stalemate",
    ],
  },
};

export interface FutureVariant {
  title: string;
  shortDescription: string;
  traits: TraitName[];
  imageName?: keyof typeof VariantImages;
  implemented: boolean;
  ruleNames: RuleName[];
  complexity: number;
}

export type FutureVariantName =
  | "atomic"
  | "crazyhouse"
  | "cylindrical"
  | "emptyCenter"
  | "fatigue"
  | "hex"
  | "kingOfTheHill"
  | "kleinBottle"
  | "mobius"
  | "noFork"
  | "patheticKing"
  | "polar"
  | "spherical"
  | "threeCheck"
  | "toroidal"
  | "chemicallyExcitedKnight"
  | "chainReaction"
  | "pull"
  | "morphlings"
  | "zoneOfControl"
  | "loseOnStalemate"
  | "gambit"
  | "centerfold"
  | "fortifications";

export const futureVariants: { [key in FutureVariantName]: FutureVariant } = {
  atomic: {
    title: "Atomic",
    shortDescription:
      "Captures lead to a small explosion. Pawns are immune to the blast zone.",
    traits: ["Ability"],
    imageName: "atomicImage",
    implemented: true,
    ruleNames: ["atomic"],
    complexity: 1,
  },
  crazyhouse: {
    title: "Crazyhouse",
    shortDescription: "Play captured pieces on the board.",
    traits: ["Ability"],
    imageName: "crazyhouseImage",
    implemented: true,
    ruleNames: ["crazyhouse"],
    complexity: 2,
  },
  cylindrical: {
    title: "Cylindrical",
    shortDescription: "End columns of the board are glued together.",
    traits: ["Geometry"],
    imageName: "cylinderImage",
    implemented: true,
    ruleNames: ["cylindrical"],
    complexity: 1,
  },
  emptyCenter: {
    title: "Empty Center",
    shortDescription: "No pieces allowed in the center!",
    traits: ["Restriction"],
    imageName: "emptyCenterImage",
    implemented: true,
    ruleNames: ["emptyCenter"],
    complexity: 1,
  },
  fatigue: {
    title: "Fatigue",
    shortDescription:
      "Pieces can't be moved twice in a row, unless they can kill the king.",
    traits: ["Restriction"],
    imageName: "fatigueImage",
    implemented: true,
    ruleNames: ["fatigue"],
    complexity: 1,
  },
  hex: {
    title: "Hex",
    shortDescription: "A board tiled with hexagons.",
    traits: ["Board"],
    imageName: "hexImage",
    implemented: true,
    ruleNames: ["hex"],
    complexity: 3,
  },
  kingOfTheHill: {
    title: "King of the Hill",
    shortDescription: "Win the game with a king reaching the center.",
    traits: ["Ending"],
    imageName: "kingOfTheHillImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  kleinBottle: {
    title: "Klein Bottle",
    shortDescription: "Chess on a klein bottle!? [Mobius and Cylinder]",
    traits: ["Board", "Geometry"],
    imageName: "kleinBottleImage",
    implemented: true,
    ruleNames: [
      "mobius",
      "longBoard",
      "passiveMoveThroughBoard",
      "verticallyCylindrical",
      "cylindrical",
    ],
    complexity: 7,
  },
  mobius: {
    title: "Möbius",
    shortDescription:
      "A long board möbius strip, with the ability to phase through to empty squares.",
    traits: ["Board", "Geometry"],
    imageName: "mobiusImage",
    implemented: true,
    ruleNames: [
      "mobius",
      "longBoard",
      "passiveMoveThroughBoard",
      "verticallyCylindrical",
    ],
    complexity: 6,
  },
  noFork: {
    title: "No Fork",
    shortDescription:
      "No moves are allowed which result in knights attacking more than 1 enemy piece.",
    traits: ["Piece", "Restriction"],
    imageName: "noForkImage",
    implemented: true,
    ruleNames: ["noFork"],
    complexity: 4,
  },
  chemicallyExcitedKnight: {
    title: "Chemically Excited Knight",
    shortDescription: "Knights that can see 3 enemy pieces explode.",
    traits: ["Piece", "Ability"],
    imageName: "chemicallyExcitedKnightImage",
    implemented: true,
    ruleNames: ["chemicallyExcitedKnight"],
    complexity: 1,
  },
  chainReaction: {
    title: "Chain Reaction",
    shortDescription:
      "When a piece is captured it captures all the pieces it was threatening.",
    traits: ["Ability"],
    imageName: "chainReactionImage",
    implemented: true,
    ruleNames: ["chainReaction"],
    complexity: 3,
  },
  patheticKing: {
    title: "Pathetic King",
    shortDescription: "Kings cannot capture.",
    traits: ["Piece", "Restriction"],
    imageName: "patheticKingImage",
    implemented: true,
    ruleNames: ["patheticKing"],
    complexity: 1,
  },
  polar: {
    title: "Polar",
    shortDescription: "Slide through end rows and re-emerge through the same row.",
    traits: ["Geometry"],
    imageName: "polarImage",
    implemented: true,
    ruleNames: ["polar"],
    complexity: 2,
  },
  spherical: {
    title: "Spherical",
    shortDescription: "The board wrapped around a sphere. [Polar and Cylinder]",
    traits: ["Geometry"],
    imageName: "sphericalImage",
    implemented: true,
    ruleNames: ["cylindrical", "polar"],
    complexity: 3,
  },
  threeCheck: {
    title: "3-Check",
    shortDescription: "3 checks and you're out.",
    traits: ["Ending"],
    imageName: "threeCheckImage",
    implemented: true,
    ruleNames: ["threeCheck"],
    complexity: 1,
  },
  toroidal: {
    title: "Toroidal",
    shortDescription: "Double the cylinder and pawns!",
    traits: ["Board", "Geometry"],
    imageName: "toroidalImage",
    implemented: true,
    ruleNames: ["longBoard", "cylindrical", "verticallyCylindrical"],
    complexity: 4,
  },
  pull: {
    title: "Pull",
    shortDescription: "Pull friendly pieces along a path.",
    traits: ["Ability"],
    imageName: "pullImage",
    implemented: false,
    ruleNames: ["pull"],
    complexity: 2,
  },
  morphlings: {
    title: "Morphlings",
    shortDescription:
      "When knights move they turn into bishops and when bishops move they turn into knights",
    traits: ["Piece"],
    imageName: "morphlingsImage",
    implemented: true,
    ruleNames: ["morphlings"],
    complexity: 1,
  },
  zoneOfControl: {
    title: "Zone of Control",
    shortDescription:
      "Pieces can only continue for a single step after entering enemy territory.",
    traits: ["Ability", "Restriction"],
    imageName: "zoneOfControlImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  loseOnStalemate: {
    title: "Lose on Stalemate",
    shortDescription: "A player is eliminated if they have no moves on their turn.",
    traits: ["Ending"],
    imageName: "loseOnStalemateImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  gambit: {
    title: "Gambit",
    shortDescription: "A player can capture their own pieces.",
    traits: ["Ability"],
    imageName: "gambitImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  centerfold: {
    title: "Centerfold",
    shortDescription:
      "North and south sides of a board connect to themselves like a racetrack.",
    traits: ["Geometry"],
    imageName: "centerfoldImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  fortifications: {
    title: "Fortifications",
    shortDescription: "Rooks cannot capture or be captured.",
    traits: ["Ability"],
    imageName: "fortificationsImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
};

export type AdviceLevel = "SUCCESS" | "ERROR" | "WARNING" | "NEUTRAL";

interface VariantConflict {
  variant1: FutureVariantName;
  variant2: FutureVariantName;
  message: string;
  level: AdviceLevel;
}
