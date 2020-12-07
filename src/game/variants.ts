import {
  castling,
  cylindrical,
  hex,
  hexCylindrical,
  loseWithNoKings,
  mobius,
  passiveMoveThroughBoard,
  pawnDoubleStep,
  polar,
  standard,
  longBoard,
  atomic,
  fatigue,
  Interception,
} from "./Rules";
import { verticallyCylindrical } from "game/Rules/verticallyCylindrical";
import { TraitClass } from "game/types";
import * as VariantImages from "primitives/VariantImage";
import { Rule } from "./Rules";

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
    description: "Your usual bog-standard game of chess (sans en passant).",
    rules: [standard, loseWithNoKings, pawnDoubleStep, castling, Interception],
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
    ],
  },
  ["Hex Chess"]: {
    description:
      "Chess but with hexagons instead of squares. Watch out for the sneaky bishops.",
    rules: [hex, loseWithNoKings, pawnDoubleStep, castling, Interception],
  },
  ["Cylindrical Hex Chess"]: {
    description: "Hexagonal chess where you can move through the sides of the board!",
    rules: [hex, loseWithNoKings, pawnDoubleStep, hexCylindrical, castling, Interception],
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
    ],
  },
  ["Variant Fusion"]: {
    description: "A custom fusion of variants.",
    rules: [],
  },
};

export interface FutureVariant {
  title: string;
  shortDescription: string;
  TraitClass: TraitClass[];
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
    TraitClass: ["ability"],
    imageName: "armageddonImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.atomic]: {
    title: "Atomic",
    shortDescription:
      "Captures lead to a small explosion. Pawns are immune to the blast zone.",
    TraitClass: ["ability"],
    imageName: "atomicImage",
    implemented: true,
    rules: [atomic],
  },
  [FutureVariantName.centerRemoval]: {
    title: "Center Removal",
    shortDescription: "Center squares and the pieces on them are removed from the game.",
    TraitClass: ["world"],
    imageName: "centerRemovalImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.crazyhouse]: {
    title: "Crazyhouse",
    shortDescription: "Play captured pieces on the board.",
    TraitClass: ["ability"],
    imageName: "crazyhouseImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.cylinder]: {
    title: "Cylinder",
    shortDescription: "End columns of the board are glued together.",
    TraitClass: ["geometry"],
    imageName: "cylinderImage",
    implemented: true,
    rules: [cylindrical],
  },
  [FutureVariantName.fatigue]: {
    title: "Fatigue",
    shortDescription:
      "Pieces can't be moved twice in a row, unless they can kill the king.",
    TraitClass: ["restriction"],
    imageName: "fatigueImage",
    implemented: true,
    rules: [fatigue],
  },
  [FutureVariantName.hex]: {
    title: "Hex",
    shortDescription: "A board tiled with hexagons.",
    TraitClass: ["world"],
    imageName: "hexImage",
    implemented: true,
    rules: [hex],
  },
  [FutureVariantName.kingOfTheHill]: {
    title: "King of the Hill",
    shortDescription: "Win the game with a king reaching the center.",
    TraitClass: ["game end"],
    imageName: "kingOfTheHillImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.mobius]: {
    title: "Mobius",
    shortDescription:
      "A long board mobius strip, with the ability to phase through to empty squares.",
    TraitClass: ["geometry", "world"],
    imageName: "mobiusImage",
    implemented: true,
    rules: [mobius, longBoard, passiveMoveThroughBoard, verticallyCylindrical],
  },
  [FutureVariantName.noFork]: {
    title: "No Fork",
    shortDescription: "Knights can no longer attack 2 or more pieces.",
    TraitClass: ["piece", "restriction"],
    imageName: "noForkImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.patheticKing]: {
    title: "Pathetic King",
    shortDescription: "Kings cannot capture.",
    TraitClass: ["piece", "restriction"],
    imageName: "patheticKingImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.polar]: {
    title: "Polar",
    shortDescription: "Slide through end rows and re-emerge through the same row.",
    TraitClass: ["geometry"],
    imageName: "polarImage",
    implemented: true,
    rules: [polar],
  },
  [FutureVariantName.push]: {
    title: "Push",
    shortDescription: "Push chains of neighbouring friendly pieces.",
    TraitClass: ["ability"],
    imageName: "pushImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.spherical]: {
    title: "Spherical",
    shortDescription: "The board wrapped around a sphere. Cylinder together with Polar.",
    TraitClass: ["geometry"],
    imageName: "sphericalImage",
    implemented: true,
    rules: [cylindrical, polar],
  },
  [FutureVariantName.threeCheck]: {
    title: "3-Check",
    shortDescription: "3 checks and you're out.",
    TraitClass: ["game end"],
    imageName: "threeCheckImage",
    implemented: false,
    rules: [],
  },
  [FutureVariantName.toroidal]: {
    title: "Toroidal",
    shortDescription: "Double the cylinder and pawns on a long board.",
    TraitClass: ["geometry", "world"],
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
