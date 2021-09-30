import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { TileSchematic } from "ui/Tiles/TileProps";
import type Color from "color";
import { tileSchematicPositionViewProps } from "utilities";

interface Props {
  color: Color;
  tileSchematic: TileSchematic;
}

const ArcTileCenterHighlight: FC<Props> = ({ color, tileSchematic }) => {
  return (
    <View style={tileSchematicPositionViewProps(tileSchematic)} pointerEvents={"none"}>
      <DefaultHighlight color={color} pointerEvents={"none"} />
    </View>
  );
};

const DefaultHighlight = styled(View)<{ color: Color }>`
  background-color: ${({ color }): string => color.fade(0.3).string()};
  position: absolute;
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  border-radius: 50px;
`;

export { ArcTileCenterHighlight };
