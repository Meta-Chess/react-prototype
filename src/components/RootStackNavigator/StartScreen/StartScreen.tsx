import React, { FC, useState } from "react";
import { View, useWindowDimensions, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Colors, MChessLogo } from "primitives";
import { StartButton } from "./StartButton";
import { defaultGameOptions, GameOptionControls } from "./GameOptionControls";
import { GameOptions } from "game/types";
import { VerticalSeparator } from "ui";
import { ShadowBoard } from "./ShadowBoard";
import { GameProvider } from "game";

const StartScreen: FC = () => {
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);

  return (
    <GameProvider
      gameOptions={{ ...gameOptions, time: undefined, online: false, flipBoard: false }}
    >
      <ScreenContainer>
        <View
          style={{
            alignItems: "center",
            width,
            height,
            flexDirection: portrait ? "column" : "row",
          }}
        >
          <View
            style={{
              flex: portrait ? 1 : 2,
              width,
              height,
              justifyContent: "center",
              alignItems: "center",
              padding: 24,
            }}
          >
            <ShadowBoard />
            <MChessLogo />
          </View>
          {!portrait && <VerticalSeparator />}
          <View
            style={{
              flex: portrait ? 2 : 1,
              height,
              padding: 20,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 2, justifyContent: portrait ? "flex-start" : "center" }}>
              <GameOptionControls
                gameOptions={gameOptions}
                setGameOptions={setGameOptions}
              />
              <StartButton
                gameOptions={gameOptions}
                style={{ width: 240, marginTop: 32 }}
              />
            </View>
          </View>
        </View>
      </ScreenContainer>
    </GameProvider>
  );
};

const ScreenContainer = styled(ScrollView)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  background-color: ${Colors.DARKEST.string()};
`;

export { StartScreen };
