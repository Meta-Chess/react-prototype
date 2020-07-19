import React, { FC, useState, createContext } from "react";
import { Board } from "./components";
import styled from "styled-components/native";
import { GameStateProvider } from "domain/State";
import { PieceCredit } from "./components";
import { View, useWindowDimensions } from "react-native";

const GameScreen = () => {
  const padding = 24;
  const { width, height } = useWindowDimensions();

  return (
    <GameStateProvider>
      <ScreenContainer style={{ padding, width, height }}>
        <Board
          maxHeight={height - 2 * padding}
          maxWidth={width - 2 * padding}
        />
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
`;

export { GameScreen };
