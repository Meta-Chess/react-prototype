import type { LathePoints, ShapePoints } from "./types";
import { Vector2 } from "three";

// NOTE- if we are changing any points, we want to make sure we consider changing corresponding features if they exist

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

export const bishopBase: LathePoints = [
  new Vector2(0, 0),
  new Vector2(0.09, 0),
  new Vector2(0.09, 0.03),
  new Vector2(0.06, 0.03),
  new Vector2(0.04, 0.09),
  new Vector2(0.03, 0.15),
  new Vector2(0.05, 0.15),
  new Vector2(0.05, 0.16),
  new Vector2(0.035, 0.16),
  new Vector2(0, 0.16),
];

// TODO: try a smoother shape?
// TODO: work out how to get the Knights to face the right way
export const horseNeckAndHead: ShapePoints = [
  { x: 0.035, y: 0.08 },
  { x: 0.045, y: 0.16 },
  { x: 0.03, y: 0.19 },
  { x: 0.027, y: 0.2 },
  { x: 0.02, y: 0.19 },
  { x: -0.02, y: 0.185 },
  { x: -0.065, y: 0.17 },
  { x: -0.065, y: 0.1585 },
  { x: -0.0615, y: 0.155 },
  { x: -0.005, y: 0.155 },
  { x: -0.04, y: 0.08 },
];
