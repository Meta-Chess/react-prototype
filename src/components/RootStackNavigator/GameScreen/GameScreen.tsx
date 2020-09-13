import React, { FC } from "react";
import { View, Platform, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { Screens, useRoute, useNavigation } from "navigation";
import { GameProvider } from "game";
import { Colors } from "primitives";
import { Button } from "ui";
import { Board } from "components/shared/Board";
import { PieceCredit } from "./PieceCredit";
import { Sidebar } from "./Sidebar";

const GameScreen: FC = () => {
  const { params } = useRoute<Screens.GameScreen>();
  const navigation = useNavigation();

  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  if (portrait)
    return (
      <GameProvider {...params}>
        <ScreenContainer>
          <Board style={{ marginTop: 32 }} />
          <Button text="Finish Game" onPress={navigation.goBack} style={{ margin: 32 }} />
          <PieceCredit style={{ marginTop: 24 }} />
        </ScreenContainer>
      </GameProvider>
    );

  return (
    <GameProvider {...params}>
      <ScreenContainer style={{ flexDirection: "row" }}>
        <View style={{ flex: 2 }}>
          <Board
            style={{
              marginHorizontal: Platform.OS === "web" ? 16 : 0,
              justifyContent: "center",
            }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 60 }}>
          <Sidebar />
          <PieceCredit />
        </View>
      </ScreenContainer>
    </GameProvider>
  );
};

const ScreenContainer = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background: ${Colors.DARKEST.string()};
  width: 100%;
  height: 100%;
`;

export { GameScreen };
