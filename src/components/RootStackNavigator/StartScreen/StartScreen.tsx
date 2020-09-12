import React, { FC, useState } from "react";
import { View, Platform, useWindowDimensions, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Colors, MChessLogo } from "primitives";
import { SelectInput, LabeledCheckBox } from "ui";
import { VariantName, variants } from "game";
import { StartButton } from "./StartButton";
import { defaultGameOptions, GameOptionControls } from "./GameOptionControls";
import { GameOptions } from "game/types";
import { VerticalSeparator } from "ui/Separators";

const StartScreen: FC = () => {
  const padding = 12;

  const { height, width } = useWindowDimensions();

  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);
  const portrait = height > width;

  return portrait ? (
    <ScreenContainer style={{ padding }}>
      <View style={{ alignItems: "center", height }}>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <MChessLogo style={{ margin: 24 }} />
        </View>
        <View style={{ flex: 3 }}>
          <StartButton gameOptions={gameOptions} style={{ width: 240 }} />
          <GameOptionControls gameOptions={gameOptions} setGameOptions={setGameOptions} />
        </View>
      </View>
    </ScreenContainer>
  ) : (
    <ScreenContainer style={{ padding }}>
      <View
        style={{
          alignItems: "center",
          height,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <MChessLogo />
        </View>
        <VerticalSeparator />
        <View
          style={{
            flex: 1,
            height,
            padding: 20,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 3, justifyContent: "flex-end" }}>
            <GameOptionControls
              gameOptions={gameOptions}
              setGameOptions={setGameOptions}
            />
          </View>
          <View style={{ flex: 2 }}>
            <StartButton gameOptions={gameOptions} style={{ width: 240 }} />
          </View>
        </View>
      </View>
    </ScreenContainer>
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
