import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { OnlineGameMaster, PlayerName } from "game";
import { GameContext } from "./GameContext";

interface Props {
  playerName: PlayerName;
  hidden?: boolean;
  alignment?: "left" | "center" | "right";
}

const Timer: SFC<Props> = ({ style, playerName, hidden, alignment = "center" }) => {
  const { gameMaster } = useContext(GameContext);
  const [dummy, setDummy] = useState(false);

  const timer = gameMaster?.game.clock?.getPlayerTimer(playerName);

  const asOf =
    gameMaster?.timersAsOf ||
    (gameMaster instanceof OnlineGameMaster
      ? gameMaster.clockUpdatePendingSince
      : undefined);
  const formattedTime = timer?.getFormattedTime(asOf);
  const displayTime = formattedTime?.time;
  const validFor = formattedTime?.validFor;
  const timeRemaining = timer?.getTimeRemaining();
  useEffect(() => {
    if (timeRemaining !== undefined && timeRemaining <= 0) {
      if (gameMaster instanceof OnlineGameMaster)
        setTimeout(() => {
          timer?.stop(Date.now());
          gameMaster?.handlePossibleTimerFinish();
        }, 500);
      else {
        timer?.stop(Date.now());
        gameMaster?.handlePossibleTimerFinish();
      }
    }
  }, [timer, gameMaster, timeRemaining]);

  const timeout = setTimeout(
    () => {
      setDummy(!dummy);
    },
    validFor ? validFor : 100
  );

  useEffect(() => {
    return (): void => clearTimeout(timeout);
  }, [timeout]);

  if (!timer) return null;

  return hidden === true ? (
    <View style={style} />
  ) : (
    <Container style={style} timeRemaining={timeRemaining}>
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

const Container = styled(View)<{ timeRemaining?: number }>`
  padding: 8px 12px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({ timeRemaining }): string =>
    timeRemaining && timeRemaining <= 0
      ? Colors.HIGHLIGHT.ERROR.fade(0.6).toString()
      : "transparent"};
`;

export { Timer };
