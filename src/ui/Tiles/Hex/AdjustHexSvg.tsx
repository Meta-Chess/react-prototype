import React, { FC, PropsWithChildren, ReactNode } from "react";
import styled from "styled-components/native";
import { hexSvgScaleFactor } from "primitives/Tiles";

interface Props {
  size: number;
  children?: ReactNode;
}

export const AdjustHexSvg: FC<Props> = ({ size, children }) => {
  return (
    <Container size={size} pointerEvents={"none"}>
      {children}
    </Container>
  );
};

const Container = styled.View<{ size: number }>`
  position: absolute;
  margin-left: ${({ size }): number => ((1 - size) * (hexSvgScaleFactor - 1)) / 2}px;
  margin-top: ${({ size }): number => ((1 - size) * (hexSvgScaleFactor - 1)) / 2}px;
`;
