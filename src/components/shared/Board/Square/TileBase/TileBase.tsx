import React, { FC } from "react";
import { SquareShape } from "game";
import { SquareTile } from "ui/Tiles/Square";
import { HexTile } from "ui/Tiles/Hex";
import { ArcTilePressable } from "./ArcTilePressable";
import { TriangleTilePressable } from "./TriangleTilePressable";
import type { TilePressableProps } from "./TilePressableProps";

const TILES: { [shape in SquareShape]: FC<TilePressableProps> } = {
  [SquareShape.Square]: SquareTile,
  [SquareShape.Hex]: HexTile,
  [SquareShape.Arc]: ArcTilePressable,
  [SquareShape.Triangle]: TriangleTilePressable,
};

export const TileBase: FC<TilePressableProps & { shape: SquareShape }> = ({
  shape,
  onPress,
  ...rest
}) => {
  const Tile = TILES[shape];
  return <Tile onPress={onPress} {...rest} />;
};
