import React, { FC } from "react";
import styled from "styled-components/native";
import { View, useWindowDimensions } from "react-native";
import { StartButton } from "./components";
import { Skeleton } from "primitives";

const StartScreen: FC = () => {
  const padding = 12;
  const { width, height } = useWindowDimensions();

  return (
    <ScreenContainer style={{ padding, width, height }}>
      <StartButton />
      <Skeleton style={{ height: 30, width: 180, marginTop: 40 }} />
    </ScreenContainer>
  );
};

const ScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  background-color: #232323;
  align-items: center;
  justify-content: center;
`;

export { StartScreen };
