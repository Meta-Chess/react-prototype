import React, { FC, useState, useCallback } from "react";
import { MChessLogo } from "primitives";
import { GameProvider, GameOptions, defaultGameOptions, calculateGameOptions } from "game";
import { ShadowBoard } from "./ShadowBoard";
import { StartScreenLayoutContainer } from "./StartScreenLayoutContainer";
import { ScreenContainer } from "components/shared";
import { HelpMenu } from "components/shared";
import { Lobby } from "./Lobby";
import { SpotlightGame } from "./SpotlightGame";
import { Screens, useNavigation } from "navigation";
import {Button, Row} from "ui";
import {SetupGameButton} from "components/RootStackNavigator/StartScreen/SetupGameButton";

const StartScreen: FC = () => {
  const [gameOptions] = useState<GameOptions>(defaultGameOptions);
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
              <SpotlightGame style={{ marginTop: 12 }} />
              <Lobby style={{ marginTop: 12 }} />
              <Row style={{ marginTop: 12, width: 400 }}>
                <Button
                  onPress={(): void => startGame(calculateGameOptions(gameOptions, []))}
                  label={"Play"}
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
