import { LatheGeometry, Vector2 } from "three";

const rookPoints = [
  new Vector2(0, 0),
  new Vector2(0.1, 0),
  new Vector2(0.1, 0.03),
  new Vector2(0.06, 0.03),
  new Vector2(0.06, 0.17),
  new Vector2(0.08, 0.17),
  new Vector2(0.08, 0.23),
  new Vector2(0.06, 0.23),
  new Vector2(0.06, 0.2),
  new Vector2(0, 0.2),
];

export const rookGeometry = new LatheGeometry(rookPoints, 20);
