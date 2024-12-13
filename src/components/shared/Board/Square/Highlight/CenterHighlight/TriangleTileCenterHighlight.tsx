import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { TileSchematic } from "ui/Tiles/TileProps";
import { tileSchematicPositionViewProps } from "utilities";
import Color from "color";
import { TriangleTile } from "ui/Tiles/Triangle";

interface Props {
  color: Color;
  tileSchematic: TileSchematic;
}

// style={}
const TriangleTileCenterHighlight: FC<Props> = ({ color, tileSchematic }) => {
  return <TriangleTile tileSchematic={{ ...tileSchematic, scale: 0.6 }} color={color} />;
};

export { TriangleTileCenterHighlight };
