import React, { FC, useState } from "react";
import {
  View,
  useWindowDimensions,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import styled from "styled-components/native";
import { Colors, MChessLogo } from "primitives";
import { StartButton } from "./StartButton";
import { defaultGameOptions, GameOptionControls } from "./GameOptionControls";
import { GameOptions } from "game/types";
import { AbsoluteView, Row, VerticalSeparator } from "ui";
import { ShadowBoard } from "./ShadowBoard";
import { GameProvider } from "game";
import { SetupGameButton } from "components/RootStackNavigator/StartScreen/SetupGameButton";

const StartScreen: FC = () => {
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);

  return (
    <GameProvider
      gameOptions={{ ...gameOptions, time: undefined, online: false, flipBoard: false }}
    >
      <ScreenContainer>
        <SafeAreaView
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
            {(Platform.OS === "web" || width > 1000 || height > 1000) && <ShadowBoard />}
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
              justifyContent: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                justifyContent: portrait ? "flex-start" : "center",
                width: "100%",
                maxHeight: portrait ? undefined : height,
                flex: portrait ? 1 : undefined,
              }}
            >
              <ScrollView style={{ width: "100%" }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    paddingVertical: 40,
                  }}
                >
                  <GameOptionControls
                    gameOptions={gameOptions}
                    setGameOptions={setGameOptions}
                  />
                  <Row style={{ marginTop: 24, width: 240 }}>
                    <StartButton gameOptions={gameOptions} style={{ flex: 1 }} />
                    <SetupGameButton style={{ flex: 1, marginLeft: 8 }} />
                  </Row>
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </ScreenContainer>
    </GameProvider>
  );
};

const ScreenContainer = styled(AbsoluteView)`
  display: flex;
  background-color: ${Colors.DARKEST.string()};
`;

export { StartScreen };
