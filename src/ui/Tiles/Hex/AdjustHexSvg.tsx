import React, { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { hexSvgScaleFactor } from "primitives/Tiles";

export const AdjustHexSvg: FC<{ size: number }> = ({ size, children }) => {
  return (
    <Container size={size} pointerEvents={"none"}>
      {children}
    </Container>
  );
};

const Container = styled(View)<{ size: number }>`
  position: absolute;
  margin-left: ${({ size }): number => ((1 - size) * (hexSvgScaleFactor - 1)) / 2}px;
  margin-top: ${({ size }): number => ((1 - size) * (hexSvgScaleFactor - 1)) / 2}px;
`;
