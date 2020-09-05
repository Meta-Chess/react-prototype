import React, { useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { GameContext } from "game";
import { Timer } from "./Timer";

const Clocks: SFC = ({ style }) => {
  const { game } = useContext(GameContext);
  if (!game?.clock) return null;

  return (
    <Container style={style}>
      {game.players.map((player, index) => (
        <Timer
          style={{
            marginRight: index < game.players.length - 1 ? 12 : 0,
          }}
          player={player}
          alignment={game.players.length > 2 ? "center" : index === 0 ? "left" : "right"}
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
