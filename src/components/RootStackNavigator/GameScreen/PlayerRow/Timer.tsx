import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { GameContext } from "game";
import { PlayerName } from "game/types";
import { AbsoluteView, Card } from "ui";

interface Props {
  player: PlayerName;
  hidden?: boolean;
  alignment?: "left" | "center" | "right";
}

const Timer: SFC<Props> = ({ style, player, hidden, alignment = "center" }) => {
  const { gameMaster } = useContext(GameContext);
  const [dummy, setDummy] = useState(false);

  const timer = gameMaster?.game.clock?.getPlayerTimer(player);

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

  if (!timer) return null; // Consider throwing an error?

  return hidden === true ? (
    <View style={style} />
  ) : (
    <Container style={style}>
      {timer.getTimeRemaining() <= 0 && (
        <AbsoluteView
          style={{ backgroundColor: Colors.HIGHLIGHT.ERROR.fade(0.6).toString() }}
        />
      )}
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

const Container = styled(Card)`
  padding: 8px 12px;
`;

export { Timer };