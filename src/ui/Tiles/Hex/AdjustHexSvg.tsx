import React, { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

export const AdjustHexSvg: FC<{ size: number }> = ({ size, children }) => {
  return (
    <Container size={size} pointerEvents={"none"}>
      {children}
    </Container>
  );
};

const Container = styled(View)<{ size: number }>`
  position: absolute;
  margin-left: ${({ size }): number => ((1 - size) * 0.41) / 2};
  margin-top: ${({ size }): number => ((1 - size) * 0.41) / 2};
`;
