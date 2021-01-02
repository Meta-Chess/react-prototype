import React from "react";
import { SFC } from "primitives";
import { SquareShape } from "game/types";
import { SquareTileAnimated, HexTileAnimated } from "./Tiles";

interface TileAppearanceProps {
  shape: SquareShape | undefined;
  size: number;
  animated?: boolean;
}

const TileAppearance: SFC<TileAppearanceProps> = ({ shape, size, animated = false }) => {
  const options = {
    [SquareShape.Hex]: <HexTileAnimated size={size} color={color} />,
  };
  return shape ? options[shape] : <SquareTileAnimated size={size} color={color} />;
};

export { TileAppearance };
