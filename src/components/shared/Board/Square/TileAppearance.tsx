import React from "react";
import { SFC } from "primitives";
import { SquareShape } from "game/types";
import { SquareTile, HexTile } from "primitives/Tiles";

interface TileAppearanceProps {
  shape: SquareShape | undefined;
  size: number;
  color: string;
}

const TileAppearance: SFC<TileAppearanceProps> = ({ shape, size, color }) => {
  const options = {
    [SquareShape.Hex]: <HexTile size={size} color={color} />,
  };
  return shape ? options[shape] : <SquareTile size={size} color={color} />;
};

export { TileAppearance };
