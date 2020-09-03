import React, { useState, useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { GameContext } from "game";
import { Player } from "game/types";
import { contrast } from "utilities";

interface Props {
  player: Player;
}

const Timer: SFC<Props> = ({ style, player }) => {
  const { game } = useContext(GameContext);
  const [dummy, setDummy] = useState(false);

  if (!game) return null;
  const clock = game.clock.getPlayerTimer(player);

  const formattedTime = clock?.getFormattedTime();
  const displayTime = formattedTime?.time;
  const validFor = formattedTime?.validFor;

  if (validFor !== Number.POSITIVE_INFINITY) {
    setTimeout(() => {
      setDummy(!dummy);
    }, validFor || 1000);
  }

  if (!clock) return null; // Consider throwing an error?

  return (
    <Container
      style={[
        style,
        {
          backgroundColor: Colors.PLAYER[player].string(),
          borderColor: contrast(Colors.PLAYER[player].string()),
          borderWidth: 2,
          shadowRadius: 12,
          shadowColor:
            clock.getTimeRemaining() <= 0 ? Colors.ERROR.string() : "transparent",
        },
      ]}
    >
      <Text.DisplayS
        color={contrast(Colors.PLAYER[player].string())}
        monospaceNumbers={true}
      >
        {displayTime}
      </Text.DisplayS>
    </Container>
  );
};

const Container = styled(View)`
  padding: 8px 12px;
  border-radius: 8px;
`;

export { Timer };
