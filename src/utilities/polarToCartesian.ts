import type { Point, Degrees } from "game/types";

export function polarToCartesian({
  centerX,
  centerY,
  radius,
  angle,
}: {
  centerX: number;
  centerY: number;
  radius: number;
  angle: Degrees;
}): Point {
  const angleInRadians = ((angle - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
