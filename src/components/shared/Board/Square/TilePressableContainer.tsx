import React from "react";
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

// All the containers should have the same type as the square container
const CONTAINERS: { [shape in SquareShape]: typeof SquareContainer } = {
  [SquareShape.Square]: SquareContainer,
  [SquareShape.Hex]: HexContainer,
};

interface TilePressableContainerProps {
  shape: SquareShape;
  size: number;
  onPress: () => void;
}

const TilePressableContainer: SFC<TilePressableContainerProps> = ({
  shape,
  size,
  onPress,
  children,
}) => {
  const Container = CONTAINERS[shape];
  return (
    <Container size={size} onPress={onPress} activeOpacity={1} accessible={false}>
      {children}
    </Container>
  );
};

export { TilePressableContainer };
