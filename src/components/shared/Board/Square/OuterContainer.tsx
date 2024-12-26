import React, { FC, ReactNode } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import { TileSchematic } from "ui/Tiles/TileProps";

interface Props {
  tileSchematic?: TileSchematic;
  size?: number;
  children?: ReactNode;
}

export const OuterContainer: FC<Props> = ({ tileSchematic, size = 0, children }) => {
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
