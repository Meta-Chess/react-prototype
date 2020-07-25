import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import { SFC } from "primitives";
import { GameContext } from "domain/State";
import { Player } from "domain/State/types";
import { formatMillis } from "utilities";

const Timer: SFC = ({ style }) => {
  const { gameState } = useContext(GameContext);
  const clock = gameState.clock.getPlayerClock(Player.Black);

  if (!clock) throw new Error("Insufficient information to render clock");
  const timeSinceCorrect = moment().diff(clock.atTime);
  const timeRemaining = timeSinceCorrect
    ? clock.timeRemaining - timeSinceCorrect
    : clock.timeRemaining;
  const display = formatMillis(Math.max(timeRemaining * 10000, 0));

  const [dummy, setDummy] = useState(false);
  setInterval(
    () => {
      setDummy(!dummy);
    },
    17 //timeRemaining > 11000 ? 1000 : 100 // TODO: improve
  );
  return (
    <Container style={style}>
      <Text style={{ color: "white" }}>{display}</Text>
    </Container>
  );
};

const Container = styled(View)`
  padding: 8px 12px;
  border-radius: 8px;
  background: #0a0a0a;
`;

export { Timer };
