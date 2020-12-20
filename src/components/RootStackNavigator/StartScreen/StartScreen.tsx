import React, { FC, useState, useCallback } from "react";
import { MChessLogo } from "primitives";
import { Button, Row } from "ui";
import { GameProvider } from "game";
import { GameOptions } from "game/types";
import { defaultGameOptions, GameOptionControls } from "./GameOptionControls";
import { ShadowBoard } from "./ShadowBoard";
import { StartScreenLayoutContainer } from "./StartScreenLayoutContainer";
import { Screens, useNavigation, ScreenContainer } from "navigation";
import { SetupGameButton } from "components/RootStackNavigator/StartScreen/SetupGameButton";

const StartScreen: FC = () => {
  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);
  const navigation = useNavigation();

  const startGame = useCallback(
    (): void =>
      navigation.navigate(Screens.GameScreen, {
        gameOptions,
        roomId: gameOptions.roomId,
      }),
    [gameOptions, navigation]
  );

  return (
    <GameProvider
      gameOptions={{ ...gameOptions, time: undefined, online: false, flipBoard: false }}
    >
      <ScreenContainer>
        <StartScreenLayoutContainer
          a={
            <>
              <ShadowBoard />
              <MChessLogo />
            </>
          }
          b={
            <>
              <GameOptionControls
                gameOptions={gameOptions}
                setGameOptions={setGameOptions}
                onSubmit={startGame}
              />
              <Row style={{ marginTop: 24, width: 300 }}>
                <Button onPress={startGame} text={"Play"} style={{ flex: 1 }} />
                <SetupGameButton style={{ flex: 1, marginLeft: 8 }} />
              </Row>
            </>
          }
        />
      </ScreenContainer>
    </GameProvider>
  );
};

export { StartScreen };
