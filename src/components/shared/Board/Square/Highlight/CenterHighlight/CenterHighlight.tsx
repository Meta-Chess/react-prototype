import React, { FC } from "react";
import { SquareShape } from "game";
import styled from "styled-components/native";
import { View } from "react-native";
import { TileSchematic } from "ui/Tiles/TileProps";
import { ArcTileCenterHighlight } from "./ArcTileCenterHighlight";
import { TriangleTileCenterHighlight } from "./TriangleTileCenterHighlight";
import Color from "color";

interface Props {
  color: Color;
  shape: SquareShape;
  tileSchematic?: TileSchematic;
}

const HIGHLIGHTS: {
  [key in SquareShape]?: FC<{ color: Color; tileSchematic: TileSchematic }>;
} = {
  [SquareShape.Arc]: ArcTileCenterHighlight,
  [SquareShape.Triangle]: TriangleTileCenterHighlight,
};

const CenterHighlight: FC<Props> = ({ color, shape, tileSchematic }) => {
  if (!(shape in HIGHLIGHTS)) {
    return <DefaultHighlight color={color} pointerEvents={"none"} />;
  }
  const CustomHighlight = HIGHLIGHTS[shape];
  if (tileSchematic === undefined || CustomHighlight === undefined) return <></>;

  return <CustomHighlight color={color} tileSchematic={tileSchematic} />;
};

const DefaultHighlight = styled(View)<{ color: Color }>`
  background-color: ${({ color }): string => color.toString()};
  position: absolute;
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  border-radius: 50px;
`;

export { CenterHighlight };
