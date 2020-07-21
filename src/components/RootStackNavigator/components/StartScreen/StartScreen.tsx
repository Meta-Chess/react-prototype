import React, { FC, useContext } from "react";
import styled from "styled-components/native";
import { View, useWindowDimensions } from "react-native";
import { Button } from "ui";

const StartScreen: FC = () => {
  const padding = 12;
  const { width, height } = useWindowDimensions();

  return (
    <ScreenContainer style={{ padding, width, height }}>
      <Button onPress={() => {}} text={"m-Chess"} />
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
