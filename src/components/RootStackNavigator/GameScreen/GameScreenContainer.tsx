import React, { FC, useContext } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { GameContext } from "game";

interface Props {
  orientation: string;
}

export const GameScreenContainer: FC<Props> = ({ children, orientation }) => {
  const { gameMaster } = useContext(GameContext);
  return (
    <StyledTouchableWithoutFeedback onPress={(): void => gameMaster?.hideModal()}>
      <StyledContainer
        style={{ flexDirection: orientation === "portrait" ? "column" : "row" }}
      >
        {children}
      </StyledContainer>
    </StyledTouchableWithoutFeedback>
  );
};

const StyledTouchableWithoutFeedback = styled(TouchableWithoutFeedback)`
  display: flex;
  width: 100%;
  height: 100%;
`;

const StyledContainer = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background: ${Colors.DARKEST.string()};
  width: 100%;
  height: 100%;
`;
