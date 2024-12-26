import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { TileSchematic } from "ui/Tiles/TileProps";
import { tileSchematicPositionViewProps } from "utilities/tileSchematicHelpers";

type Props = {
  size?: number;
  tileSchematic?: TileSchematic;
  children?: ReactNode;
};

export const PositioningContainer: FC<Props> = ({
  size = 0,
  tileSchematic,
  children,
}) => {
  return tileSchematic === undefined ? (
    <Container size={size}>{children}</Container>
  ) : (
    <View style={[tileSchematicPositionViewProps(tileSchematic)]}>{children}</View>
  );
};

const Container = styled(View)<{ size: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: ${({ size }): number => -size / 2}px;
  margin-top: ${({ size }): number => -size / 2}px;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
`;
