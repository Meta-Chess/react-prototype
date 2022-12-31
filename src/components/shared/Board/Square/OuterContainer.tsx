import React, { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import { TileSchematic } from "ui/Tiles/TileProps";

export const OuterContainer: FC<{ tileSchematic?: TileSchematic; size?: number }> = ({
  tileSchematic,
  size = 0,
  children,
}) => {
  return tileSchematic === undefined ? (
    <Container size={size}>{children}</Container>
  ) : (
    <>{children}</>
  );
};

const Container = styled(View)<{ size: number }>`
  overflow: visible;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
  background-color: transparent;
`;
