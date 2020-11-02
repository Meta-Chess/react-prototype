import {
  castling,
  cylindrical,
  hex,
  hexCylindrical,
  loseWithNoKings,
  pawnDoubleStep,
  polar,
  standard,
  longBoard,
} from "./Rules";
import { verticallyCylindrical } from "game/Rules/verticallyCylindrical";

export type VariantName = keyof typeof variants;
export const variants = {
  ["Chess"]: {
    description: "Your usual bog-standard game of chess (sans en passant).",
    rules: [standard, loseWithNoKings, pawnDoubleStep, castling],
  },
  ["Cylindrical Chess"]: {
    description: "Chess on a Cylinder! You can move through the sides of the board.",
    rules: [standard, loseWithNoKings, pawnDoubleStep, cylindrical, castling],
  },
  ["Spherical Chess"]: {
    description:
      "Chess on a sphere! You can move through the sides like you're on a cylinder, and through the top and bottom as if they were the poles of a sphere.",
    rules: [standard, loseWithNoKings, pawnDoubleStep, cylindrical, polar, castling],
  },
  ["Hex Chess"]: {
    description:
      "Chess but with hexagons instead of squares. Watch out for the sneaky bishops.",
    rules: [hex, loseWithNoKings, pawnDoubleStep, castling],
  },
  ["Cylindrical Hex Chess"]: {
    description: "Hexagonal chess where you can move through the sides of the board!",
    rules: [hex, loseWithNoKings, pawnDoubleStep, hexCylindrical, castling],
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
    ],
  },
};
