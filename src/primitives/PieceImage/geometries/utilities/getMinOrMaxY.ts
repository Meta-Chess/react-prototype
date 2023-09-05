import type { ShapePoints, LathePoints } from "../parts";

export function getMinOrMaxY(
  points: ShapePoints | LathePoints,
  minOrMax: "min" | "max"
): number {
  const yValues = points.map((point) => point.y);
  return minOrMax === "min" ? Math.min(...yValues) : Math.max(...yValues);
}
