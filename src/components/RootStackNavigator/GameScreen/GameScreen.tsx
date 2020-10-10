import React, { FC, useContext } from "react";
import { View, Platform, useWindowDimensions } from "react-native";
import { Screens, useRoute } from "navigation";
import { GameContext, GameProvider } from "game";
import { Board } from "components/shared/Board";
import { Sidebar } from "./Sidebar";
import { GlobalModal } from "./GlobalModal";
import { GameScreenContainer } from "./GameScreenContainer";
import { RoomIdCard } from "./Sidebar/RoomIdCard";

const GameScreen: FC = () => {
  const { params } = useRoute<Screens.GameScreen>();
  const { gameMaster } = useContext(GameContext);
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  if (portrait)
    return (
      <GameProvider {...params}>
        <GameScreenContainer orientation="portrait">
          <RoomIdCard roomId={gameMaster?.roomId} />
          <Board
            style={{
              marginTop: 48,
              marginHorizontal: Platform.OS === "web" ? 16 : 0,
            }}
          />
          <Sidebar short />
        </GameScreenContainer>
      </GameProvider>
    );

  return (
    <GameProvider {...params}>
      <GameScreenContainer orientation="landscape">
        <View style={{ flex: 2 }}>
          <Board
            style={{
              marginHorizontal: Platform.OS === "web" ? 16 : 0,
              justifyContent: "center",
            }}
          />
        </View>
        <Sidebar />
      </GameScreenContainer>
      <GlobalModal />
    </GameProvider>
  );
};

export { GameScreen };
