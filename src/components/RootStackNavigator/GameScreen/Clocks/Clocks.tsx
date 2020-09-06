import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { GameContext } from "game";
import { Timer } from "./Timer";

const Clocks: SFC = ({ style }) => {
  const { gameMaster } = useContext(GameContext);
  if (!gameMaster?.game.clock) return null;
  const players = gameMaster.game.players;

  return (
    <Container style={style}>
      {players.map((player, index) => (
        <Timer
          style={{
            marginRight: index < players.length - 1 ? 12 : 0,
          }}
          player={player}
          alignment={players.length > 2 ? "center" : index === 0 ? "left" : "right"}
          key={player}
        />
      ))}
    </Container>
  );
};

const Container = styled(View)`
  display: flex;
  flex-direction: row;
  padding-horizontal: 12px;
  justify-content: space-between;
`;

export { Clocks };
