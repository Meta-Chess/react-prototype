import React, { FC } from "react";
import { Board } from "./components";
import styled from "styled-components";
import { GameStateProvider } from "domain/gameState";
import { Clocks } from "./components";
import { View, Text, Linking, useWindowDimensions } from "react-native";

const GameScreen: FC = () => {
  const padding = 12;
  const { width, height } = useWindowDimensions();

  const pieceCreditLink = (
    <Text
      style={{ color: "blue" }}
      onPress={() =>
        Linking.openURL(
          "https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces"
        )
      }
    >
      here
    </Text>
  );

  const creatorCreditLink = (
    <Text
      style={{ color: "blue" }}
      onPress={() =>
        Linking.openURL("https://en.wikipedia.org/wiki/User:Cburnett")
      }
    >
      User:Cburnett
    </Text>
  );

  return (
    <ScreenContainer style={{ padding }}>
      <GameStateProvider>
        <Clocks />
        <Board
          maxHeight={height - 2 * padding}
          maxWidth={width - 2 * padding}
        />
      </GameStateProvider>
      <View style={{ backgroundColor: "white" }}>
        <Text>
          Chess pieces originally by {creatorCreditLink} under creative commons
          license, found {pieceCreditLink}.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const ScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  background: #232323;
`;

export { GameScreen };
