import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import Svg, { Polygon, Circle } from "react-native-svg";

interface ArrowProps {
  /**
   * Horizontal length of the rectangular tail (in px).
   */
  arrowLength: number;

  /**
   * Height of the arrow body/tail (in px).
   */
  arrowBodyHeight: number;

  /**
   * The arrowhead’s total horizontal width (in px).
   */
  arrowHeadWidth: number;

  /**
   * The arrowhead’s total vertical height (in px).
   * Can be larger or smaller than the arrow body height.
   */
  arrowHeadHeight: number;

  /**
   * Color of the arrow (default: 'white').
   */
  color?: string;

  /**
   * Rotation in degrees (default: 0).
   */
  rotation?: number;

  /**
   * Left (x) position on the screen (default: 0).
   */
  x?: number;

  /**
   * Top (y) position on the screen (default: 0).
   */
  y?: number;

  /**
   * Optional style overrides for the outer container.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Whether to show a semi-transparent overlay behind the arrow (default: false).
   */
  overlay?: boolean;
}

const Arrow: React.FC<ArrowProps> = ({
  arrowLength,
  arrowBodyHeight,
  arrowHeadWidth,
  arrowHeadHeight,
  color = "white",
  rotation = 0,
  x = 0,
  y = 0,
  containerStyle,
  overlay = false,
}) => {
  /**
   * Construct the points for the polygon (pointing to the right):
   *
   * We have a rectangular tail from (0,0) → (arrowLength,0) → (arrowLength, arrowBodyHeight) → (0, arrowBodyHeight).
   * Then a triangular head that can be taller (or shorter) than the body.
   *
   * For the head:
   *  - The top of the triangle will start at (arrowLength, midBody - arrowHeadHeight/2)
   *  - The tip at        (arrowLength + arrowHeadWidth, midBody)
   *  - The bottom at     (arrowLength, midBody + arrowHeadHeight/2)
   *
   * Where midBody = arrowBodyHeight / 2.
   * This ensures the arrowhead’s midpoint aligns with the center line of the arrow body.
   */

  // Body mid-line (vertical center).
  const midBody = arrowBodyHeight / 2;

  // Points for the polygon (in [x,y] format).
  const polygonPoints = [
    [0, 0], // top-left corner of body
    [arrowLength, 0], // top-right corner of body
    [arrowLength, midBody - arrowHeadHeight / 2], // arrow head top
    [arrowLength + arrowHeadWidth, midBody], // arrow head tip
    [arrowLength, midBody + arrowHeadHeight / 2], // arrow head bottom
    [arrowLength, arrowBodyHeight], // bottom-right corner of body
    [0, arrowBodyHeight], // bottom-left corner of body
  ];

  const points = polygonPoints.map(([px, py]) => [px + x, py + y]).join(" ");

  return (
    <Polygon
      points={points}
      fill={color}
      transform={`rotate(${rotation}, ${x}, ${y + arrowBodyHeight / 2})`} // Apply rotation around x, y
      pointerEvents={"none"}
    />
  );
};

export default Arrow;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    // Rotation occurs around the "center" of this View by default.
  },
  overlay: {
    // Makes the entire screen a semi-transparent overlay behind the arrow.
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
