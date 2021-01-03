import React, { FC } from "react";
import { TileProps } from "./TileProps";
import { SquareShape } from "game/types";
import { SquareTile } from "./SquareTile";
import { HexTile } from "./HexTile";

const TILES: { [shape in SquareShape]: FC<TileProps> } = {
  [SquareShape.Square]: SquareTile,
  [SquareShape.Hex]: HexTile,
};

export const Tile: FC<TileProps & { shape: SquareShape }> = ({ shape, ...rest }) => {
  const Tile = TILES[shape];
  return <Tile {...rest} />;
};
