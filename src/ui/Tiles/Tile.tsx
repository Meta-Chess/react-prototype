import React, { FC } from "react";
import { TileProps } from "./TileProps";
import { SquareShape } from "game";
import { SquareTile } from "./Square";
import { HexTile } from "./Hex";
import { ArcTile } from "./Arc";

const TILES: { [shape in SquareShape]: FC<TileProps> } = {
  [SquareShape.Square]: SquareTile,
  [SquareShape.Hex]: HexTile,
  [SquareShape.Arc]: ArcTile,
};

export const Tile: FC<TileProps & { shape: SquareShape }> = ({ shape, ...rest }) => {
  const Tile = TILES[shape];
  return <Tile {...rest} />;
};
