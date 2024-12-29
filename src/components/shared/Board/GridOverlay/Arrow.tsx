import React from "react";
import { Polygon } from "react-native-svg";

interface ArrowProps {
  arrowBodyLength: number;
  arrowBodyHeight: number;
  arrowHeadWidth: number;
  arrowHeadHeight: number;
  color?: string;
  rotationInDegrees?: number;
  x?: number;
  y?: number;
  centerOffset?: number;
}

const Arrow: React.FC<ArrowProps> = ({
  arrowBodyLength,
  arrowBodyHeight,
  arrowHeadWidth,
  arrowHeadHeight,
  color = "white",
  rotationInDegrees = 0,
  x = 0,
  y = 0,
  centerOffset = 0,
}) => {
  /**
   * Construct the points for the polygon (pointing to the right):
   *
   * We have a rectangular tail from (0,0) → (arrowBodyLength,0) → (arrowBodyLength, arrowBodyHeight) → (0, arrowBodyHeight).
   *
   * For the head:
   *  - The top of the triangle will start at (arrowBodyLength, midBody - arrowHeadHeight/2)
   *  - The tip at (arrowBodyLength + arrowHeadWidth, midBody)
   *  - The bottom at (arrowBodyLength, midBody + arrowHeadHeight/2)
   *
   * Where midBody = arrowBodyHeight / 2.
   * This ensures the arrowhead’s midpoint aligns with the center line of the arrow body.
   */

  const midBody = arrowBodyHeight / 2;
  const polygonPoints = [
    [0, 0],
    [arrowBodyLength, 0],
    [arrowBodyLength, midBody - arrowHeadHeight / 2],
    [arrowBodyLength + arrowHeadWidth, midBody],
    [arrowBodyLength, midBody + arrowHeadHeight / 2],
    [arrowBodyLength, arrowBodyHeight],
    [0, arrowBodyHeight],
  ];

  const points = polygonPoints
    .map(([px, py]) => [px + x + centerOffset, py + y])
    .join(" ");

  return (
    <Polygon
      points={points}
      fill={color}
      transform={`rotate(${rotationInDegrees}, ${x}, ${y + arrowBodyHeight / 2})`}
      pointerEvents={"none"}
    />
  );
};

export default Arrow;
