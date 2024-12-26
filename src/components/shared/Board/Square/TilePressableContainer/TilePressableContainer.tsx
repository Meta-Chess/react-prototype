import React, { FC, ReactNode } from "react";
import { SFC } from "primitives";
import { TouchableOpacity } from "react-native";
import { SquareShape } from "game";
import styled from "styled-components/native";

const SquareContainer = styled(TouchableOpacity)<{ size: number }>`
  position: absolute;
  height: ${({ size }): number => size}px;
  width: ${({ size }): number => size}px;
  border-radius: 0;
`;

const HexContainer = styled(TouchableOpacity)<{ size: number }>`
  position: absolute;
  height: ${({ size }): number => size}px;
  width: ${({ size }): number => size}px;
  border-radius: 50px;
`;

const NoContainer: FC<{ children?: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const CONTAINERS: {
  [shape in SquareShape]: typeof SquareContainer | typeof NoContainer;
} = {
  [SquareShape.Square]: SquareContainer,
  [SquareShape.Hex]: HexContainer,
  [SquareShape.Arc]: NoContainer,
};

const TilePressableContainer: SFC<{
  size?: number;
  shape: SquareShape;
  onPress: () => void;
}> = ({ size = 0, shape, onPress, children }) => {
  const Container = CONTAINERS[shape];
  return (
    <Container size={size} onPress={onPress}>
      {children}
    </Container>
  );
};

export { TilePressableContainer };
