import React, { FC, useContext } from "react";
import { View, Platform, useWindowDimensions } from "react-native";
import { Screens, useRoute, useNavigation } from "navigation";
import { GameContext, GameProvider } from "game";
import { Button } from "ui";
import { Board } from "components/shared/Board";
import { PieceCredit } from "./Sidebar/PieceCredit";
import { Sidebar } from "./Sidebar";
import { GlobalModal } from "./GlobalModal";
import { GameScreenContainer } from "./GameScreenContainer";
import { RoomIdDisplay } from "./RoomIdDisplay";

const GameScreen: FC = () => {
  const { params } = useRoute<Screens.GameScreen>();
  const { gameMaster } = useContext(GameContext);
  const navigation = useNavigation();

  const { height, width } = useWindowDimensions();
  const portrait = height > width;

  if (portrait)
    return (
      <GameProvider {...params}>
        <GameScreenContainer orientation="portrait">
          <RoomIdDisplay />
          <Board style={{ marginTop: 32 }} />
          <Button
            text="Finish Game"
            onPress={(): void => {
              gameMaster?.endGame();
              navigation.goBack();
            }}
            style={{ margin: 32 }}
          />
          <PieceCredit style={{ marginTop: 24 }} />
        </GameScreenContainer>
      </GameProvider>
    );

  return (
    <GameProvider {...params}>
      <GameScreenContainer orientation="landscape">
        <View style={{ flex: 2 }}>
          <RoomIdDisplay />
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
