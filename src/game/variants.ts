import {
  Cylindrical,
  Hex,
  HexCylindrical,
  HexPawnDoubleStep,
  PawnDoubleStep,
  Polar,
  Standard,
} from "./Rules";

export type VariantName = keyof typeof variants;

export const variants = {
  ["Chess"]: {
    description: "Your usual chess, but missing castling, and en passant.",
    rules: [Standard, PawnDoubleStep],
  },
  ["Cylindrical Chess"]: {
    description: "Chess on a Cylinder! You can move through the sides of the board.",
    rules: [Standard, PawnDoubleStep, Cylindrical],
  },
  ["Spherical Chess"]: {
    description:
      "Chess on a sphere! You can move through the sides like you're on a cylinder, and through the top and bottom as if they were the poles of a sphere.",
    rules: [Standard, PawnDoubleStep, Cylindrical, Polar],
  },
  ["Hex Chess"]: {
    description:
      "Chess but with hexagons instead of squares. Watch out for the sneaky bishops.",
    rules: [Hex, HexPawnDoubleStep],
  },
  ["Cylindrical Hex Chess"]: {
    description: "Hexagonal chess where you can move through the sides of the board!",
    rules: [Hex, HexPawnDoubleStep, HexCylindrical],
  },
};
