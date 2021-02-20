import React, { FC, useState, useCallback } from "react";
import { MChessLogo } from "primitives";
import { Button, Row } from "ui";
import { GameProvider, GameOptions, defaultGameOptions } from "game";
import { GameOptionControls } from "./GameOptionControls";
import { ShadowBoard } from "./ShadowBoard";
import { StartScreenLayoutContainer } from "./StartScreenLayoutContainer";
import { Screens, useNavigation } from "navigation";
import { SetupGameButton } from "./SetupGameButton";
import { ScreenContainer } from "components/shared";
import { HelpMenu } from "components/shared";

const StartScreen: FC = () => {
  const [gameOptions, setGameOptions] = useState<GameOptions>(defaultGameOptions);
  const navigation = useNavigation();

  const startGame = useCallback(
    (gameOptions): void =>
      navigation.navigate(Screens.GameScreen, {
        gameOptions,
        roomId: gameOptions.roomId,
      }),
    [navigation]
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
                setGameOptions={(options: GameOptions): GameOptions => {
                  setGameOptions(options);
                  return options;
                }}
                onSubmit={startGame}
              />
              <Row style={{ marginTop: 24, width: 300 }}>
                <Button
                  onPress={(): void => startGame(gameOptions)}
                  text={"Play"}
                  style={{ flex: 1 }}
                />
                <SetupGameButton style={{ flex: 1, marginLeft: 8 }} />
              </Row>
            </>
          }
        />
        <HelpMenu context={{ gameOptions }} />
      </ScreenContainer>
    </GameProvider>
  );
};

export { StartScreen };
