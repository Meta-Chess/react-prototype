import React, { FC } from "react";
import { TileSchematic } from "ui/Tiles/TileProps";
import Color from "color";
import { TriangleTile } from "ui/Tiles/Triangle";

interface Props {
  color: Color;
  tileSchematic: TileSchematic;
}

const TriangleTileCenterHighlight: FC<Props> = ({ color, tileSchematic }) => {
  return <TriangleTile tileSchematic={{ ...tileSchematic, scale: 0.6 }} color={color} />;
};

export { TriangleTileCenterHighlight };
