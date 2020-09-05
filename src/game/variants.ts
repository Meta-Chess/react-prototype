import {
  Castling,
  Cylindrical,
  Hex,
  HexCylindrical,
  HexPawnDoubleStep,
  PawnDoubleStep,
  Polar,
  Standard,
  Check,
  loseWithNoKings,
  Fatigue,
} from "./Rules";

export type VariantName = keyof typeof variants;

export const variants = {
  ["Chess"]: {
    description: "Your usual chess, but missing castling, and en passant.",
    rules: [Standard, Check, loseWithNoKings, PawnDoubleStep, Castling, Fatigue],
  },
  ["Cylindrical Chess"]: {
    description: "Chess on a Cylinder! You can move through the sides of the board.",
    rules: [Standard, Check, loseWithNoKings, PawnDoubleStep, Cylindrical, Castling],
  },
  ["Spherical Chess"]: {
    description:
      "Chess on a sphere! You can move through the sides like you're on a cylinder, and through the top and bottom as if they were the poles of a sphere.",
    rules: [
      Standard,
      Check,
      loseWithNoKings,
      PawnDoubleStep,
      Cylindrical,
      Polar,
      Castling,
    ],
  },
  ["Hex Chess"]: {
    description:
      "Chess but with hexagons instead of squares. Watch out for the sneaky bishops.",
    rules: [Hex, Check, loseWithNoKings, HexPawnDoubleStep, Castling],
  },
  ["Cylindrical Hex Chess"]: {
    description: "Hexagonal chess where you can move through the sides of the board!",
    rules: [
      Hex,
      Check,
      loseWithNoKings,
      HexPawnDoubleStep,
      HexCylindrical,
      Castling,
      Fatigue,
    ],
  },
};
