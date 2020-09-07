import {
  Castling,
  Cylindrical,
  Hex,
  HexCylindrical,
  HexPawnDoubleStep,
  PawnDoubleStep,
  Polar,
  Standard,
  loseWithNoKings,
} from "./Rules";

export type VariantName = keyof typeof variants;

export const variants = {
  ["Chess"]: {
    description: "Your usual chess, but missing castling, and en passant.",
    rules: [Standard, loseWithNoKings, PawnDoubleStep, Castling],
  },
  ["Cylindrical Chess"]: {
    description: "Chess on a Cylinder! You can move through the sides of the board.",
    rules: [Standard, loseWithNoKings, PawnDoubleStep, Cylindrical, Castling],
  },
  ["Spherical Chess"]: {
    description:
      "Chess on a sphere! You can move through the sides like you're on a cylinder, and through the top and bottom as if they were the poles of a sphere.",
    rules: [Standard, loseWithNoKings, PawnDoubleStep, Cylindrical, Polar, Castling],
  },
  ["Hex Chess"]: {
    description:
      "Chess but with hexagons instead of squares. Watch out for the sneaky bishops.",
    rules: [Hex, loseWithNoKings, HexPawnDoubleStep, Castling],
  },
  ["Cylindrical Hex Chess"]: {
    description: "Hexagonal chess where you can move through the sides of the board!",
    rules: [Hex, loseWithNoKings, HexPawnDoubleStep, HexCylindrical, Castling],
  },
};
