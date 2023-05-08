import { Shape, ExtrudeGeometry } from "three";
import type { BufferGeometry } from "three";
import type { ShapePoints, LathePoints } from "./types";

export function getMinOrMaxY(
  points: ShapePoints | LathePoints,
  minOrMax: "min" | "max"
): number {
  const yValues = points.map((point) => point.y);
  return minOrMax === "min" ? Math.min(...yValues) : Math.max(...yValues);
}

export function buildShape(points: ShapePoints): Shape {
  const shape = new Shape();
  shape.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => shape.lineTo(point.x, point.y));
  return shape;
}

export function buildBeveledExtrudedGeometry(shape: Shape): BufferGeometry {
  return new ExtrudeGeometry(shape, {
    steps: 2,
    depth: 0.03,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  }).translate(0, 0.01, -0.015);
}
