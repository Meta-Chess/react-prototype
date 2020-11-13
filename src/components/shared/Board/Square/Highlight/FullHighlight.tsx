import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";
import { HexTileView } from "../HexTileView";
import Color from "color";
import { SquareShape } from "game/types";

interface FullHighlightProps {
  color: Color;
  size: number;
  shape?: SquareShape;
}

const FullHighlight: SFC<FullHighlightProps> = ({ color, size, shape }) => {
  const highlightColor = color.fade(0.3).string();

  return shape === SquareShape.Hex ? (
    <HexTileView radius={size / 2} colorString={highlightColor} />
  ) : (
    <View
      style={{
        height: size,
        width: size,
        backgroundColor: highlightColor,
        position: "absolute",
      }}
    />
  );
};

export { FullHighlight };
