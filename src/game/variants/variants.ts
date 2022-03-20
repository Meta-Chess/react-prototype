import { RuleName, RuleNamesWithParams } from "../CompactRules";
import * as VariantImages from "primitives/VariantImage";
import { TraitName } from "game/variants/traitInfo";
import { PieceName } from "game/types";

export const integrateWithOtherRules: {
  [key in RuleName]?: (rules: RuleName[]) => RuleName[];
} = {
  cylindrical: (ruleNames: RuleName[]): RuleName[] => {
    return ruleNames.includes("hex") ? ["hexCylindrical"] : ["cylindrical"];
  },
  standard: (rules: RuleName[]): RuleName[] => {
    return rules.includes("hex") ||
      rules.includes("longBoard") ||
      rules.includes("grandChess")
      ? []
      : ["standard"];
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
  shortTitle?: string;
  shortDescription: string;
  traits: TraitName[];
  imageName?: keyof typeof VariantImages;
  implemented: boolean;
  ruleNames: RuleName[];
  overrideRuleParams?: RuleNamesWithParams;
  complexity: number;
}

export type FutureVariantName =
  | "atomic"
  | "crazyhouse"
  | "cylindrical"
  | "diagonalMirror"
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
  | "thinIce"
  | "threeCheck"
  | "toroidal"
  | "chemicallyExcitedKnight"
  | "chainReaction"
  | "pull"
  | "morphlings"
  | "zoneOfControl"
  | "loseOnStalemate"
  | "gambit"
  | "extinction"
  | "centerfold"
  | "brick"
  | "royallyScrewed"
  | "pawnOrbit"
  | "completedKnight"
  | "puppeteers"
  | "grandChess";

export const futureVariants: { [key in FutureVariantName]: FutureVariant } = {
  grandChess: {
    title: "Grand",
    shortDescription:
      "Grand chess is a large-board chess variant invented by Dutch games designer Christian Freeling in 1984",
    traits: ["Board"],
    imageName: undefined,
    implemented: true,
    ruleNames: ["grandChess"],
    overrideRuleParams: {
      promotion: {
        "Promotion Pieces": [
          [
            PieceName.Knight,
            PieceName.Bishop,
            PieceName.Rook,
            PieceName.Queen,
            PieceName.BishopKnight,
            PieceName.RookKnight,
          ],
        ],
        "Only Friendly Dead Pieces": true,
        "Non Promotion Moves": true,
      },
    },
    complexity: 1,
  },

  puppeteers: {
    title: "Puppeteers",
    shortDescription: "Pieces seen by friendly knights can move as the knights",
    traits: ["Movement"],
    imageName: "puppeteersImage",
    implemented: false,
    ruleNames: ["puppeteers"],
    complexity: 1,
  },
  atomic: {
    title: "Atomic",
    shortDescription:
      "Captures lead to a small explosion. Pawns are immune to the blast zone.",
    traits: ["Reaction"],
    imageName: "atomicImage",
    implemented: true,
    ruleNames: ["atomic"],
    complexity: 1,
  },
  pawnOrbit: {
    title: "Pawn Orbit",
    shortDescription:
      "Pawns can rotate pieces around themselves clockwise or anticlockwise.",
    traits: ["Movement"],
    imageName: "pawnOrbitImage",
    implemented: true,
    ruleNames: ["pawnOrbit"],
    complexity: 3,
  },
  royallyScrewed: {
    title: "Royally Screwed",
    shortDescription: "After every move, friendly kings and queens swap places.",
    traits: ["Reaction"],
    imageName: "royallyScrewedImage",
    implemented: true,
    ruleNames: ["royallyScrewed"],
    complexity: 2,
  },
  crazyhouse: {
    title: "Crazyhouse",
    shortDescription: "Play captured pieces on the board.",
    traits: ["Movement", "Reaction"],
    imageName: "crazyhouseImage",
    implemented: true,
    ruleNames: ["crazyhouse"],
    complexity: 2,
  },
  cylindrical: {
    title: "Cylindrical",
    shortDescription: "End columns of the board are glued together.",
    traits: ["Board"],
    imageName: "cylinderImage",
    implemented: true,
    ruleNames: ["cylindrical"],
    complexity: 1,
  },
  diagonalMirror: {
    title: "Diagonal Mirror",
    shortDescription: "Pieces may reflect diagonally off of edges.",
    traits: ["Movement"],
    imageName: "diagonalMirrorImage",
    implemented: true,
    ruleNames: ["diagonalMirror"],
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
    traits: ["Reaction", "Restriction"],
    imageName: "fatigueImage",
    implemented: true,
    ruleNames: ["fatigue"],
    complexity: 1,
  },
  hex: {
    title: "Hex",
    shortDescription: "A board tiled with hexagons.",
    traits: ["Board"],
    imageName: "hexBoardImage",
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
    traits: ["Board"],
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
    traits: ["Board"],
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
    traits: ["Restriction", "Simulation"],
    imageName: "noForkImage",
    implemented: true,
    ruleNames: ["noFork"],
    complexity: 4,
  },
  chemicallyExcitedKnight: {
    title: "Chemically Excited Knight",
    shortTitle: "Chem Knight",
    shortDescription: "Knights that can see 3 enemy pieces explode.",
    traits: ["Reaction"],
    imageName: "chemicallyExcitedKnightImage",
    implemented: true,
    ruleNames: ["chemicallyExcitedKnight"],
    complexity: 1,
  },
  chainReaction: {
    title: "Chain Reaction",
    shortDescription:
      "When a piece is captured it captures all the pieces it was threatening.",
    traits: ["Reaction", "Simulation"],
    imageName: "chainReactionImage",
    implemented: true,
    ruleNames: ["chainReaction"],
    complexity: 3,
  },
  patheticKing: {
    title: "Pathetic King",
    shortDescription: "Kings cannot capture.",
    traits: ["Restriction"],
    imageName: "patheticKingImage",
    implemented: true,
    ruleNames: ["patheticKing"],
    complexity: 1,
  },
  polar: {
    title: "Polar",
    shortDescription: "Slide through end rows and re-emerge through the same row.",
    traits: ["Board"],
    imageName: "polarImage",
    implemented: true,
    ruleNames: ["polar"],
    complexity: 2,
  },
  spherical: {
    title: "Spherical",
    shortDescription: "The board wrapped around a sphere. [Polar and Cylinder]",
    traits: ["Board"],
    imageName: "sphericalImage",
    implemented: true,
    ruleNames: ["cylindrical", "polar"],
    complexity: 3,
  },
  thinIce: {
    title: "Thin Ice",
    shortDescription: "You're skating on thin ice!",
    traits: ["Board", "Reaction"],
    imageName: "thinIceImage",
    implemented: true,
    ruleNames: ["thinIce"],
    complexity: 3,
  },
  threeCheck: {
    title: "3-Check",
    shortDescription: "3 checks and you're out.",
    traits: ["Ending", "Simulation"],
    imageName: "threeCheckImage",
    implemented: true,
    ruleNames: ["threeCheck"],
    complexity: 1,
  },
  toroidal: {
    title: "Toroidal",
    shortDescription: "Double the cylinder and pawns!",
    traits: ["Board"],
    imageName: "toroidalImage",
    implemented: true,
    ruleNames: ["longBoard", "cylindrical", "verticallyCylindrical"],
    complexity: 4,
  },
  extinction: {
    title: "Extinction",
    shortDescription: "If a piece type goes extinct for a player, they lose the game.",
    traits: ["Ending"],
    imageName: "extinctionImage",
    implemented: true,
    ruleNames: ["extinction"],
    complexity: 3,
  },
  pull: {
    title: "Pull",
    shortDescription: "Pull friendly pieces along a path.",
    traits: ["Movement"],
    imageName: "pullImage",
    implemented: true,
    ruleNames: ["pull"],
    complexity: 2,
  },
  morphlings: {
    title: "Morphlings",
    shortDescription:
      "When knights move they turn into bishops and when bishops move they turn into knights.",
    traits: ["Reaction"],
    imageName: "morphlingsImage",
    implemented: true,
    ruleNames: ["morphlings"],
    complexity: 1,
  },
  zoneOfControl: {
    title: "Zone of Control",
    shortDescription:
      "Pieces can only continue for a single step after entering enemy territory.",
    traits: [],
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
    traits: [],
    imageName: "gambitImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  centerfold: {
    title: "Centerfold",
    shortDescription:
      "North and south sides of a board connect to themselves like a racetrack.",
    traits: ["Board"],
    imageName: "centerfoldImage",
    implemented: false,
    ruleNames: [],
    complexity: 0,
  },
  brick: {
    title: "Brick",
    shortDescription: "Rooks cannot initiate capture or be captured.",
    traits: ["Restriction"],
    imageName: "brickImage",
    implemented: true,
    ruleNames: ["brick"],
    complexity: 1,
  },
  completedKnight: {
    title: "Completed Knight",
    shortDescription: "Knights can additionally move 3 spaces in each lateral direction.",
    traits: ["Movement"],
    imageName: "completedKnightImage",
    implemented: true,
    ruleNames: ["completedKnight"],
    complexity: 1,
  },
};

export type ConflictLevel = "ERROR" | "WARNING";
export type AdviceLevel = ConflictLevel | "SUCCESS" | "NEUTRAL";
