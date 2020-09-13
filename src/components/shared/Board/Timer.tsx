import React, { useState, useContext, useEffect } from "react";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { GameContext } from "game";
import { Player } from "game/types";
import { contrast } from "utilities";

interface Props {
  player: Player;
  alignment?: "left" | "center" | "right";
}

const Timer: SFC<Props> = ({ style, player, alignment = "center" }) => {
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

  return (
    <Container
      style={[
        style,
        {
          flex: Platform.OS === "web" ? undefined : 1,
          backgroundColor: Colors.PLAYER[player].string(),
          borderColor: contrast(Colors.PLAYER[player].string()),
          borderWidth: 2,
          shadowRadius: 12,
          shadowColor:
            clock.getTimeRemaining() <= 0 ? Colors.ERROR.string() : "transparent",
        },
      ]}
    >
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

const Container = styled(View)`
  padding: 8px 12px;
  border-radius: 8px;
`;

export { Timer };
