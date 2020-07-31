import React, { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { GameStateProvider } from "domain/State";
import { Board, Clocks, PieceCredit } from "./components";

const GameScreen: FC = () => {
  return (
    <GameStateProvider>
      <ScreenContainer>
        <Clocks style={{ marginTop: 16 }} />
        <Board style={{ margin: 16 }} />
        <PieceCredit />
      </ScreenContainer>
    </GameStateProvider>
  );
};

const ScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #232323;
  width: 100%;
  height: 100%;
`;

export { GameScreen };
