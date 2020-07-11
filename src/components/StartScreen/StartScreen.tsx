import React, { FC, useContext } from "react";
import styled from "styled-components";
import {
  View,
  Text,
  Linking,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Button } from "ui";
import { BigBoolContext } from "../../../App";

const StartScreen: FC = () => {
  const padding = 12;
  const { width, height } = useWindowDimensions();
  const { setBigBool } = useContext(BigBoolContext);

  return (
    <ScreenContainer style={{ padding, width, height }}>
      <Button
        onPress={() => {
          setBigBool(true);
        }}
        text={"m-Chess"}
      />
    </ScreenContainer>
  );
};

const ScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 200px;
  background: #232323;
  align-items: center;
  justify-content: center;
`;

export { StartScreen };
