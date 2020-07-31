import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { GameContext } from "domain/State";
import { Button } from "ui";
import { Timer } from "./components";

const Clocks: SFC = ({ style }) => {
  const { gameState } = useContext(GameContext);

  const nextTurn = (): void => {
    gameState.clock.setActivePlayers(gameState.clock.getInactivePlayers());
    gameState.render();
  };

  return (
    <Container style={style}>
      {gameState.players.map((player) => (
        <Timer style={{ marginRight: 12 }} player={player} key={player} />
      ))}
      <RedButton text={""} onPress={nextTurn} />
    </Container>
  );
};

const Container = styled(View)`
  display: flex;
  flex-direction: row;
`;

const RedButton = styled(Button)`
  border: none;
  background-color: #900;
  padding: 24px;
`;

export { Clocks };
