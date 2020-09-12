import React, { FC } from "react";
import { View, Platform } from "react-native";
import styled from "styled-components/native";
import { Screens, useRoute, useNavigation } from "navigation";
import { GameProvider } from "game";
import { Colors } from "primitives";
import { Button } from "ui";
import { Board } from "components/shared/Board";
import { Clocks } from "./Clocks";
import { PieceCredit } from "./PieceCredit";

const GameScreen: FC = () => {
  const { params } = useRoute<Screens.GameScreen>();
  const navigation = useNavigation();

  return (
    <GameProvider {...params}>
      <ScreenContainer>
        <Clocks style={{ marginTop: 24 }} />
        <Board
          style={{ marginTop: 24, marginHorizontal: Platform.OS === "web" ? 16 : 0 }}
        />
        <Button text="Finish Game" onPress={navigation.goBack} style={{ margin: 32 }} />
        <PieceCredit style={{ marginTop: 24 }} />
      </ScreenContainer>
    </GameProvider>
  );
};

const ScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${Colors.DARKEST.string()};
  width: 100%;
  height: 100%;
  padding-top: 16px;
`;

export { GameScreen };
