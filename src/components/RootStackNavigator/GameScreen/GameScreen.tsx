import React, { FC } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { Screens, useRoute } from "navigation";
import { GameProvider } from "game";
import { Board } from "components/shared/Board";
import { Sidebar } from "./Sidebar";
import { GlobalModal } from "./GlobalModal";
import { GameScreenContainer } from "./GameScreenContainer";

const GameScreen: FC = () => {
  const { params } = useRoute<Screens.GameScreen>();
  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  return (
    <GameProvider {...params}>
      <GameScreenContainer portrait={portrait}>
        <Board
          style={{
            marginTop: portrait ? 48 : 0,
            marginHorizontal: Platform.OS === "web" ? 16 : 0,
            justifyContent: portrait ? "flex-start" : "center",
            flex: 2,
          }}
        />
        <Sidebar short={portrait} />
      </GameScreenContainer>
      <GlobalModal />
    </GameProvider>
  );
};

export { GameScreen };
