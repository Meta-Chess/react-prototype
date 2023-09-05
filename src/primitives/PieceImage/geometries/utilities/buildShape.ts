import { Shape } from "three";
import type { ShapePoints } from "../parts";

export function buildShape(points: ShapePoints): Shape {
  const shape = new Shape();
  shape.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => shape.lineTo(point.x, point.y));
  return shape;
}
