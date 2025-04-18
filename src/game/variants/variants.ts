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
    return rules.some((rule) =>
      ["hex", "nimbus", "longBoard", "grandChess", "capablancaChess"].includes(rule)
    )
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
      "Chess on a Möbius strip! Pieces can phase through the board as a non-capturing move.",
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
  overrideBaseRules?: boolean;
  overrideRuleParams?: RuleNamesWithParams;
  complexity: number;
}

export type FutureVariantName =
  | "atomic"
  | "brick"
  | "centerfold"
  | "chainReaction"
  | "chemicallyExcitedKnight"
  | "completedKnight"
  | "crazyhouse"
  | "cylindrical"
  | "diagonalMirror"
  | "emptyCenter"
  | "extinction"
  | "fatigue"
  | "gambit"
  | "grandChess"
  | "capablancaChess"
  | "hex"
  | "kingOfTheHill"
  | "kleinBottle"
  | "loseOnStalemate"
  | "mobius"
  | "morphlings"
  | "noFork"
  | "patheticKing"
  | "pawnOrbit"
  | "polar"
  | "pull"
  | "puppeteers"
  | "royallyScrewed"
  | "spherical"
  | "thinIce"
  | "threeCheck"
  | "toroidal"
  | "zoneOfControl"
  | "push"
  | "forcedEnPassant"
  | "doubleTurn"
  | "nimbus";

export const futureVariants: { [key in FutureVariantName]: FutureVariant } = {
  doubleTurn: {
    title: "Double Turn",
    shortDescription: "Double the number of turns for each player",
    traits: ["Turn"],
    implemented: true,
    ruleNames: ["doubleTurn"],
    complexity: 2,
  },
  nimbus: {
    title: "Nimbus",
    shortDescription:
      "A triangular board variant inspired by chess, with new pieces that can change their type throughout the game.",
    traits: ["Board", "Movement", "Turn", "Ending"], // TODO: Make a new hybrid trait?
    implemented: false,
    ruleNames: ["nimbus", "promotion", "stalemate"],
    overrideBaseRules: true,
    complexity: 5,
  },
  grandChess: {
    title: "Grand",
    shortDescription:
      "A 10x10 variant, with hybrid pieces and novel rules. Invented by Dutch games designer Christian Freeling.",
    traits: ["Board"],
    implemented: true,
    ruleNames: ["grandChess", "clearCastlingTokens"],
    overrideRuleParams: {
      promotion: {
        "Promotion Pieces": [
          [
            PieceName.Knight,
            PieceName.Bishop,
            PieceName.Rook,
            PieceName.BishopKnight,
            PieceName.RookKnight,
            PieceName.Queen,
          ],
        ],
        "Only Friendly Dead Pieces": true,
        "Non Promotion Moves": true,
      },
    },
    complexity: 4,
  },
  capablancaChess: {
    title: "Capablanca",
    shortDescription:
      "A 10x8 variant with hybrid pieces. Invented by World Champion José Raúl Capablanca.",
    traits: ["Board"],
    implemented: true,
    ruleNames: ["capablancaChess"],
    overrideRuleParams: {
      promotion: {
        "Promotion Pieces": [
          [
            PieceName.Knight,
            PieceName.Bishop,
            PieceName.Rook,
            PieceName.BishopKnight,
            PieceName.RookKnight,
            PieceName.Queen,
          ],
        ],
      },
      castling: {
        "Active Piece Steps": 3,
      },
    },
    complexity: 2,
  },
  puppeteers: {
    title: "Puppeteers",
    shortDescription: "Pieces seen by friendly knights can move as the knights",
    traits: ["Movement"],
    imageName: "puppeteersImage",
    implemented: false, // TODO: fix bug and/or implementation problems with this variant
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
    shortDescription: "Double the cylinder!",
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
  push: {
    title: "Push",
    shortDescription: "Push friendly pieces along a path.",
    traits: ["Movement"],
    imageName: "pushImage",
    implemented: true,
    ruleNames: ["push"],
    complexity: 2,
  },
  forcedEnPassant: {
    title: "Forced En Passant",
    shortDescription: "En passant must be performed if possible.",
    traits: ["Restriction"],
    imageName: "forcedEnPassantImage",
    implemented: true,
    ruleNames: ["forcedEnPassant"],
    complexity: 1,
  },
};

export type ConflictLevel = "ERROR" | "WARNING";
export type AdviceLevel = ConflictLevel | "SUCCESS" | "NEUTRAL";
