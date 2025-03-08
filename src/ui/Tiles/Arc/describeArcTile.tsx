import { polarToCartesian } from "utilities";
import type { Degrees } from "game/types";

export function describeArc({
  x,
  y,
  radius,
  startAngle,
  endAngle,
}: {
  x: number;
  y: number;
  radius: number;
  startAngle: Degrees;
  endAngle: Degrees;
}): string {
  const start = polarToCartesian({ centerX: x, centerY: y, radius, angle: endAngle });
  const end = polarToCartesian({ centerX: x, centerY: y, radius, angle: startAngle });

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}
