import React, { FC } from "react";
import { AnimatedTileProps } from "./TileProps";
import { SquareShape } from "game/types";
import { SquareTileAnimated } from "./SquareTileAnimated";
import { HexTileAnimated } from "./HexTileAnimated";

const TILES: { [shape in SquareShape]: FC<AnimatedTileProps> } = {
  [SquareShape.Square]: SquareTileAnimated,
  [SquareShape.Hex]: HexTileAnimated,
};

export const AnimatedTile: FC<AnimatedTileProps & { shape: SquareShape }> = ({
  shape,
  ...rest
}) => {
  const Tile = TILES[shape];
  return <Tile {...rest} />;
};
