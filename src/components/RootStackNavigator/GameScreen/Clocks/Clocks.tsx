import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { GameContext } from "game";
import { Timer } from "./Timer";

const Clocks: SFC = ({ style }) => {
  const { game } = useContext(GameContext);
  if (!game) return null;

  return (
    <Container style={style}>
      {game.players.map((player) => (
        <Timer style={{ marginRight: 12 }} player={player} key={player} />
      ))}
    </Container>
  );
};

const Container = styled(View)`
  display: flex;
  flex-direction: row;
  height: 48px;
`;

export { Clocks };
