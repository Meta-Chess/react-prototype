import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { GameContext } from "domain/State";
import { Player } from "domain/State/types";
import { contrast } from "utilities";

interface Props {
  player: Player;
}

const Timer: SFC<Props> = ({ style, player }) => {
  const { gameState } = useContext(GameContext);
  const clock = gameState.clock.getPlayerTimer(player);

  const { time: displayTime, validFor } = clock?.getFormattedTime();

  const [dummy, setDummy] = useState(false);
  if (validFor !== Number.POSITIVE_INFINITY) {
    setTimeout(() => {
      setDummy(!dummy);
    }, validFor || 10000); // TODO: think about default
  }

  if (!clock) return null; // Consider returning error?

  return (
    <Container
      style={[
        style,
        {
          backgroundColor: player,
          borderColor: contrast(player),
          borderWidth: 2,
        },
      ]}
    >
      <Text style={{ color: contrast(player) }}>{displayTime}</Text>
    </Container>
  );
};

const Container = styled(View)`
  padding: 8px 12px;
  border-radius: 8px;
`;

export { Timer };
