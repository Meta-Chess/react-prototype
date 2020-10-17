import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { GameContext } from "game";
import { Player } from "game/types";
import { contrast } from "utilities";

interface Props {
  player: Player;
  hidden: boolean;
  alignment?: "left" | "center" | "right";
}

const Timer: SFC<Props> = ({ style, player, hidden, alignment = "center" }) => {
  const { gameMaster } = useContext(GameContext);
  const [dummy, setDummy] = useState(false);

  const clock = gameMaster?.game.clock?.getPlayerTimer(player);

  const formattedTime = clock?.getFormattedTime();
  const displayTime = formattedTime?.time;
  const validFor = formattedTime?.validFor;

  const timeout = setTimeout(
    () => {
      setDummy(!dummy);
    },
    validFor && validFor !== Number.POSITIVE_INFINITY ? validFor : 1000
  );

  useEffect(() => {
    return (): void => clearTimeout(timeout);
  }, [timeout]);

  if (!clock) return null; // Consider throwing an error?

  style = { ...style, height: 40 };
  return hidden ? (
    <View style={style} />
  ) : (
    <Container style={style} timeRemaining={clock.getTimeRemaining()} player={player}>
      <Text
        cat="BodyM"
        color={contrast(Colors.PLAYER[player].string())}
        monospaceNumbers={true}
        alignment={alignment}
      >
        {displayTime}
      </Text>
    </Container>
  );
};

interface ContainerProps {
  player: number;
  timeRemaining: number;
}

const Container = styled(View)<ContainerProps>`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ player }): string => Colors.PLAYER[player].string()};
  border: 2px solid ${({ player }): string => contrast(Colors.PLAYER[player].string())};
  box-shadow: 0px 1px 12px
    ${({ timeRemaining }): string =>
      timeRemaining <= 0 ? Colors.ERROR.toString() : "transparent"};
`;

export { Timer };
