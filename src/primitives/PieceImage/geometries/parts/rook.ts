import type { LathePoints } from "./pointTypes";
import { Vector2 } from "three";

export const rook = {
  points: [
    new Vector2(0, 0),
    new Vector2(0.09, 0),
    new Vector2(0.09, 0.03),
    new Vector2(0.08, 0.03),
    new Vector2(0.08, 0.05),
    new Vector2(0.06, 0.05),
    new Vector2(0.05, 0.17),
    new Vector2(0.07, 0.17),
    new Vector2(0.075, 0.21),
    new Vector2(0.05, 0.21),
    new Vector2(0.05, 0.18),
    new Vector2(0, 0.18),
  ] as LathePoints,
  features: {
    flatTopYPosition: 0.18,
  },
};
