import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { GameContext } from "domain/Game";
import { Button } from "ui";
import { Timer } from "./components";

const Clocks: SFC = ({ style }) => {
  const { game } = useContext(GameContext);

  const nextTurn = (): void => {
    game.clock.setActivePlayers(game.clock.getInactivePlayers());
    game.render();
  };

  return (
    <Container style={style}>
      {game.players.map((player) => (
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
