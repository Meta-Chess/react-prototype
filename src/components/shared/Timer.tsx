import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { GameContext, PlayerName } from "game";

interface Props {
  playerName: PlayerName;
  hidden?: boolean;
  alignment?: "left" | "center" | "right";
}

const Timer: SFC<Props> = ({ style, playerName, hidden, alignment = "center" }) => {
  const { gameMaster } = useContext(GameContext);
  const [dummy, setDummy] = useState(false);

  const timer = gameMaster?.game.clock?.getPlayerTimer(playerName);

  const formattedTime = timer?.getFormattedTime();
  const displayTime = formattedTime?.time;
  const validFor = formattedTime?.validFor;
  const timeRemaining = timer?.getTimeRemaining();

  useEffect(() => {
    if (timeRemaining && timeRemaining <= 0) {
      timer?.stop();
      gameMaster?.handleTimerFinish();
    }
  }, [timer, gameMaster, timeRemaining]);

  const timeout = setTimeout(
    () => {
      setDummy(!dummy);
    },
    validFor && validFor !== Number.POSITIVE_INFINITY ? validFor : 1000
  );

  useEffect(() => {
    return (): void => clearTimeout(timeout);
  }, [timeout]);

  if (!timer) return null;

  return hidden === true ? (
    <View style={style} />
  ) : (
    <Container style={style} timeRemaining={timer.getTimeRemaining()}>
      <Text
        cat="BodyM"
        color={Colors.TEXT.LIGHT.toString()}
        monospaceNumbers={true}
        alignment={alignment}
      >
        {displayTime}
      </Text>
    </Container>
  );
};

const Container = styled(View)<{ timeRemaining: number }>`
  padding: 8px 12px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({ timeRemaining }): string =>
    timeRemaining <= 0 ? Colors.HIGHLIGHT.ERROR.fade(0.6).toString() : "transparent"};
`;

export { Timer };
