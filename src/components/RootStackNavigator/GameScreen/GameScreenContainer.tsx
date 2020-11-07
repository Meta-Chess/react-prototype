import React, { FC, useContext } from "react";
import { TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { Colors } from "primitives";
import { GameContext } from "game";

interface Props {
  portrait: boolean;
}

export const GameScreenContainer: FC<Props> = ({ children, portrait }) => {
  const { gameMaster } = useContext(GameContext);
  const { height, width } = useWindowDimensions();
  return (
    <View style={{ width, height }}>
      <StyledTouchableWithoutFeedback onPress={(): void => gameMaster?.hideModal()}>
        <StyledContainer style={{ flexDirection: portrait ? "column" : "row" }}>
          {children}
        </StyledContainer>
      </StyledTouchableWithoutFeedback>
    </View>
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
