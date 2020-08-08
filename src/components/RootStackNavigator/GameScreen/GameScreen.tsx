import React, { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { GameProvider } from "domain/Game";
import { Colors } from "primitives";
import { Board } from "./Board";
import { Clocks } from "./Clocks";
import { PieceCredit } from "./PieceCredit";

const GameScreen: FC = () => {
  return (
    <GameProvider>
      <ScreenContainer>
        <Clocks style={{ marginTop: 16 }} />
        <Board style={{ margin: 16 }} />
        <PieceCredit />
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
`;

export { GameScreen };
