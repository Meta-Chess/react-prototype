import React from "react";
import { SFC } from "primitives";
import { HexTile, SquareTile } from "../Tiles";
import Color from "color";
import { SquareShape } from "game/types";

interface FullHighlightProps {
  color: Color;
  size: number;
  shape?: SquareShape;
}

const FullHighlight: SFC<FullHighlightProps> = ({ color, size, shape }) => {
  const highlightColor = color.fade(0.3).string();
  const options = {
    [SquareShape.Hex]: <HexTile size={size} color={highlightColor} />,
  };

  return shape ? options[shape] : <SquareTile size={size} color={highlightColor} />;
};

export { FullHighlight };
