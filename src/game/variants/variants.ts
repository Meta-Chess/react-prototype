import {
  Interception,
  stalemate,
  atomic,
  castling,
  cylindrical,
  fatigue,
  hex,
  hexCylindrical,
  longBoard,
  loseWithNoKings,
  mobius,
  passiveMoveThroughBoard,
  pawnDoubleStep,
  polar,
  promotion,
  standard,
} from "../Rules";
import { verticallyCylindrical } from "game/Rules/verticallyCylindrical";
import { TraitName } from "game/variants";
import * as VariantImages from "primitives/VariantImage";
import { Rule } from "../Rules";

export const integrateWithOtherRules: { [key: string]: (rules: Rule[]) => Rule[] } = {
  Cylinder: (rules: Rule[]): Rule[] => {
    return rules.includes(hex) ? [hexCylindrical] : [cylindrical];
  },
  Standard: (rules: Rule[]): Rule[] => {
    return rules.includes(hex) || rules.includes(longBoard) ? [] : [standard];
  },
};

export type VariantName = keyof typeof variants;
export const variants = {
  Chess: {
    description: "Your usual bog-standard game of chess",
    rules: [
      standard,
      loseWithNoKings,
      pawnDoubleStep,
      castling,
      Interception,
      promotion,
      stalemate,
    ],
  },
  ["Cylindrical Chess"]: {
    description: "Chess on a Cylinder! You can move through the sides of the board.",
    rules: [
      standard,
      loseWithNoKings,
      pawnDoubleStep,
      cylindrical,
      castling,
      Interception,
      promotion,
      stalemate,
    ],
  },
  ["Spherical Chess"]: {
    description:
      "Chess on a sphere! You can move through the sides like you're on a cylinder, and through the top and bottom as if they were the poles of a sphere.",
    rules: [
      standard,
      loseWithNoKings,
      pawnDoubleStep,
      cylindrical,
      polar,
      castling,
      Interception,
      promotion,
      stalemate,
    ],
  },
  ["Hex Chess"]: {
    description:
      "Chess but with hexagons instead of squares. Watch out for the sneaky bishops.",
    rules: [hex, loseWithNoKings, pawnDoubleStep, castling, Interception, promotion],
  },
  ["Cylindrical Hex Chess"]: {
    description: "Hexagonal chess where you can move through the sides of the board!",
    rules: [
      hex,
      loseWithNoKings,
      pawnDoubleStep,
      hexCylindrical,
      castling,
      Interception,
      promotion,
      stalemate,
    ],
  },
  ["Toroidal Chess"]: {
    description:
      "Chess on a torus! You can move through any edge onto the opposite edge.",
    rules: [
      longBoard,
      cylindrical,
      verticallyCylindrical,
      loseWithNoKings,
      pawnDoubleStep,
      castling,
      Interception,
      promotion,
      stalemate,
    ],
  },
  ["Möbius Chess"]: {
    description:
      "Chess on a Möbius strip! You can move through the top and bottom edges, and you can see the pieces on the opposite side of the strip!",
    rules: [
      mobius,
      passiveMoveThroughBoard,
      longBoard,
      verticallyCylindrical,
      loseWithNoKings,
      pawnDoubleStep,
      castling,
      Interception,
      promotion,
      stalemate,
    ],
  },
};

export interface FutureVariant {
  title: string;
  shortDescription: string;
  traits: TraitName[];
  imageName: keyof typeof VariantImages;
  implemented: boolean;
  rules: Rule[];
}

export enum FutureVariantName {
  threeCheck = "threeCheck",
  armageddon = "armageddon",
  atomic = "atomic",
  centerRemoval = "centerRemoval",
  cylinder = "cylinder",
  kingOfTheHill = "kingOfTheHill",
  patheticKing = "patheticKing",
  push = "push",
  crazyhouse = "crazyhouse",
  fatigue = "fatigue",
  noFork = "noFork",
  polar = "polar",
  spherical = "spherical",
  hex = "hex",
  toroidal = "toroidal",
  mobius = "mobius",
}

export const futureVariants: { [id in FutureVariantName]: FutureVariant } = {
  [FutureVariantName.armageddon]: {
    title: "Armageddon",
    shortDescription:
      "Captures lead to a large explosion. Pawns are immune to the blast zone.",
    traits: ["Ability"],
    imageName: "armageddonImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.atomic]: {
    title: "Atomic",
    shortDescription:
      "Captures lead to a small explosion. Pawns are immune to the blast zone.",
    traits: ["Ability"],
    imageName: "atomicImage",
    implemented: true,
    rules: [atomic],
  },
  [FutureVariantName.centerRemoval]: {
    title: "Center Removal",
    shortDescription: "Center squares and the pieces on them are removed from the game.",
    traits: ["Terraform"],
    imageName: "centerRemovalImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.crazyhouse]: {
    title: "Crazyhouse",
    shortDescription: "Play captured pieces on the board.",
    traits: ["Ability"],
    imageName: "crazyhouseImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.cylinder]: {
    title: "Cylinder",
    shortDescription: "End columns of the board are glued together.",
    traits: ["Geometry"],
    imageName: "cylinderImage",
    implemented: true,
    rules: [cylindrical],
  },
  [FutureVariantName.fatigue]: {
    title: "Fatigue",
    shortDescription:
      "Pieces can't be moved twice in a row, unless they can kill the king.",
    traits: ["Restrict"],
    imageName: "fatigueImage",
    implemented: true,
    rules: [fatigue],
  },
  [FutureVariantName.hex]: {
    title: "Hex",
    shortDescription: "A board tiled with hexagons.",
    traits: ["Terraform"],
    imageName: "hexImage",
    implemented: true,
    rules: [hex],
  },
  [FutureVariantName.kingOfTheHill]: {
    title: "King of the Hill",
    shortDescription: "Win the game with a king reaching the center.",
    traits: ["Game End"],
    imageName: "kingOfTheHillImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.mobius]: {
    title: "Mobius",
    shortDescription:
      "A long board mobius strip, with the ability to phase through to empty squares.",
    traits: ["Geometry", "Terraform"],
    imageName: "mobiusImage",
    implemented: true,
    rules: [mobius, longBoard, passiveMoveThroughBoard, verticallyCylindrical],
  },
  [FutureVariantName.noFork]: {
    title: "No Fork",
    shortDescription: "Knights can no longer attack 2 or more pieces.",
    traits: ["Piece", "Restrict"],
    imageName: "noForkImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.patheticKing]: {
    title: "Pathetic King",
    shortDescription: "Kings cannot capture.",
    traits: ["Piece", "Restrict"],
    imageName: "patheticKingImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.polar]: {
    title: "Polar",
    shortDescription: "Slide through end rows and re-emerge through the same row.",
    traits: ["Geometry"],
    imageName: "polarImage",
    implemented: true,
    rules: [polar],
  },
  [FutureVariantName.push]: {
    title: "Push",
    shortDescription: "Push chains of neighbouring friendly pieces.",
    traits: ["Ability"],
    imageName: "pushImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.spherical]: {
    title: "Spherical",
    shortDescription: "The board wrapped around a sphere. Cylinder together with Polar.",
    traits: ["Geometry"],
    imageName: "sphericalImage",
    implemented: true,
    rules: [cylindrical, polar],
  },
  [FutureVariantName.threeCheck]: {
    title: "3-Check",
    shortDescription: "3 checks and you're out.",
    traits: ["Game End"],
    imageName: "threeCheckImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.toroidal]: {
    title: "Toroidal",
    shortDescription: "Double the cylinder and pawns on a long board.",
    traits: ["Geometry", "Terraform"],
    imageName: "toroidalImage",
    implemented: true,
    rules: [longBoard, cylindrical, verticallyCylindrical],
  },
};

export const variantsBlacklist: { [key in FutureVariantName]?: FutureVariantName[] } = {
  [FutureVariantName.hex]: [
    FutureVariantName.toroidal,
    FutureVariantName.mobius,
    FutureVariantName.spherical,
    FutureVariantName.polar,
  ],
  [FutureVariantName.mobius]: [FutureVariantName.polar, FutureVariantName.spherical],
  [FutureVariantName.polar]: [FutureVariantName.toroidal],
  [FutureVariantName.spherical]: [FutureVariantName.toroidal],
};
