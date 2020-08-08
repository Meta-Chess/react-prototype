import React, { FC } from "react";
import { View, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { StartButton } from "./StartButton";

const StartScreen: FC = () => {
  const padding = 12;
  const { width, height } = useWindowDimensions();

  return (
    <ScreenContainer style={{ padding, width, height }}>
      <StartButton />
    </ScreenContainer>
  );
};

const ScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  background-color: ${Colors.DARKEST.string()};
  align-items: center;
  justify-content: center;
`;

export { StartScreen };
