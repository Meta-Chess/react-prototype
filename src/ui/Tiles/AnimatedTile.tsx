import React, { FC } from "react";
import { AnimatedTileProps } from "./TileProps";
import { SquareShape } from "game";
import { SquareTileAnimated } from "./Square";
import { HexTileAnimated } from "./Hex";
import { ArcTileAnimated } from "./Arc";
import { TriangleTileAnimated } from "./Triangle";

const TILES: { [shape in SquareShape]: FC<AnimatedTileProps> } = {
  [SquareShape.Square]: SquareTileAnimated,
  [SquareShape.Hex]: HexTileAnimated,
  [SquareShape.Arc]: ArcTileAnimated,
  [SquareShape.Triangle]: TriangleTileAnimated,
};

export const AnimatedTile: FC<AnimatedTileProps & { shape: SquareShape }> = ({
  shape,
  ...rest
}) => {
  const Tile = TILES[shape];
  return <Tile {...rest} />;
};
