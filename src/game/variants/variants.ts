import { RuleName } from "../Rules";
import { TraitName } from "game/variants";
import * as VariantImages from "primitives/VariantImage";

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
  | "cylindricalHex"
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
      "Interception",
      "promotion",
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
      "Interception",
      "promotion",
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
      "Interception",
      "promotion",
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
      "Interception",
      "promotion",
    ],
  },
  cylindricalHex: {
    title: "Cylindrical Hex Chess",
    description: "Hexagonal chess where you can move through the sides of the board!",
    ruleNames: [
      "hex",
      "loseWithNoKings",
      "pawnDoubleStep",
      "hexCylindrical",
      "castling",
      "Interception",
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
      "Interception",
      "promotion",
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
      "Interception",
      "promotion",
    ],
  },
};

export interface FutureVariant {
  title: string;
  shortDescription: string;
  traits: TraitName[];
  imageName: keyof typeof VariantImages;
  implemented: boolean;
  ruleNames: RuleName[];
  complexity: number;
}

export type FutureVariantName =
  | "atomic"
  | "crazyhouse"
  | "cylinder"
  | "emptyCenter"
  | "fatigue"
  | "hex"
  | "kingOfTheHill"
  | "kleinBottle"
  | "mobius"
  | "noFork"
  | "patheticKing"
  | "polar"
  | "push"
  | "spherical"
  | "threeCheck"
  | "toroidal"
  | "veto";

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
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  cylinder: {
    title: "Cylinder",
    shortDescription: "End columns of the board are glued together.",
    traits: ["Geometry"],
    imageName: "cylinderImage",
    implemented: true,
    ruleNames: ["cylindrical"],
    complexity: 1,
  },
  emptyCenter: {
    title: "Empty Center",
    shortDescription: "Pieces cannot live in the center.",
    traits: ["Restrict"],
    imageName: "emptyCenterImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  fatigue: {
    title: "Fatigue",
    shortDescription:
      "Pieces can't be moved twice in a row, unless they can kill the king.",
    traits: ["Restrict"],
    imageName: "fatigueImage",
    implemented: true,
    ruleNames: ["fatigue"],
    complexity: 1,
  },
  hex: {
    title: "Hex",
    shortDescription: "A board tiled with hexagons.",
    traits: ["Terraform"],
    imageName: "hexImage",
    implemented: true,
    ruleNames: ["hex"],
    complexity: 3,
  },
  kingOfTheHill: {
    title: "King of the Hill",
    shortDescription: "Win the game with a king reaching the center.",
    traits: ["Game End"],
    imageName: "kingOfTheHillImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  kleinBottle: {
    title: "Klein Bottle",
    shortDescription: "Chess on a klein bottle!? [Mobius and Cylinder]",
    traits: ["Terraform", "Geometry"],
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
    traits: ["Terraform", "Geometry"],
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
    shortDescription: "Knights can no longer attack 2 or more pieces.",
    traits: ["Piece", "Restrict"],
    imageName: "noForkImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  patheticKing: {
    title: "Pathetic King",
    shortDescription: "Kings cannot capture.",
    traits: ["Piece", "Restrict"],
    imageName: "patheticKingImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
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
  push: {
    title: "Push",
    shortDescription: "Push chains of neighbouring friendly pieces.",
    traits: ["Ability"],
    imageName: "pushImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
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
    traits: ["Game End"],
    imageName: "threeCheckImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  toroidal: {
    title: "Toroidal",
    shortDescription: "Double the cylinder and pawns!",
    traits: ["Terraform", "Geometry"],
    imageName: "toroidalImage",
    implemented: true,
    ruleNames: ["longBoard", "cylindrical", "verticallyCylindrical"],
    complexity: 4,
  },
  veto: {
    title: "Veto",
    shortDescription: "A move may be vetoed each turn.",
    traits: ["New Phase", "Restrict"],
    imageName: "vetoImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
};

export const variantsBlacklist: { [key in FutureVariantName]?: FutureVariantName[] } = {
  hex: ["toroidal", "mobius", "spherical", "polar"],
  mobius: ["polar", "spherical"],
  polar: ["toroidal"],
  spherical: ["toroidal"],
};
