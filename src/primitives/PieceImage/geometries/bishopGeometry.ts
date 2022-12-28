import { LatheGeometry, Vector2 } from "three";

const bishopPoints = [
  new Vector2(0, 0),
  new Vector2(0.1, 0),
  new Vector2(0.1, 0.03),
  new Vector2(0.08, 0.03),
  new Vector2(0, 0.27),
];

export const bishopGeometry = new LatheGeometry(bishopPoints, 20);
