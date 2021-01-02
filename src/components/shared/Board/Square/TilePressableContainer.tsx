import React, { ReactElement } from "react";
import { SFC } from "primitives";
import { TouchableOpacity } from "react-native";
import { SquareShape } from "game/types";
import styled from "styled-components/native";

interface TilePressableContainerProps {
  shape: SquareShape | undefined;
  size: number;
  onPress: () => void;
  contents: ReactElement;
}

const TilePressableContainer: SFC<TilePressableContainerProps> = ({
  shape,
  size,
  onPress,
  contents,
}) => {
  const SquarePressable: ReactElement = (
    <SquareContainer size={size} onPress={onPress} activeOpacity={1}>
      {contents}
    </SquareContainer>
  );
  const HexPressable: ReactElement = (
    <HexContainer size={size} onPress={onPress} activeOpacity={1}>
      {contents}
    </HexContainer>
  );

  const options = {
    [SquareShape.Hex]: HexPressable,
  };
  return shape ? options[shape] : SquarePressable;
};

export { TilePressableContainer };

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
  border-radius: 50%;
`;
