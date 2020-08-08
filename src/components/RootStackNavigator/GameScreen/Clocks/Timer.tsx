import React, { useState, useContext } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text } from "primitives";
import { GameContext } from "domain/Game";
import { Player } from "domain/Game/types";
import { contrast } from "utilities";

interface Props {
  player: Player;
}

const Timer: SFC<Props> = ({ style, player }) => {
  const { game } = useContext(GameContext);
  const clock = game.clock.getPlayerTimer(player);

  const formattedTime = clock?.getFormattedTime();
  const displayTime = formattedTime?.time;
  const validFor = formattedTime?.validFor;

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
          shadowRadius: 12,
          shadowColor: clock.getTimeRemaining() <= 0 ? "#FF0000" : "transparent",
        },
      ]}
    >
      <Text.DisplayS color={contrast(player)} monospaceNumbers={true}>
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
