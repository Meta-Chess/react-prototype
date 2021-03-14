import React, { FC, useState } from "react";
import { Colors, MChessLogo } from "primitives";
import { GameProvider, GameOptions, defaultGameOptions } from "game";
import { ShadowBoard } from "./ShadowBoard";
import { StartScreenLayoutContainer } from "./StartScreenLayoutContainer";
import { HelpMenu } from "components/shared";
import { Lobby } from "./Lobby";
import { SpotlightGame } from "./SpotlightGame";
import { PlayWithFriends } from "./PlayWithFriends";
import { ScrollView } from "react-native";
import { ErrorBoundary } from "components/shared/ErrorBoundary";

const StartScreen: FC = () => {
  const [gameOptions] = useState<GameOptions>(defaultGameOptions);

  return (
    <GameProvider
      gameOptions={{ ...gameOptions, time: undefined, online: false, flipBoard: false }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.DARKEST.toString(),
        }}
      >
        <ErrorBoundary>
          <StartScreenLayoutContainer
            a={
              <>
                <ShadowBoard />
                <MChessLogo />
              </>
            }
            b={
              <>
                <SpotlightGame />
                <PlayWithFriends style={{ marginTop: 12 }} />
                <Lobby style={{ marginTop: 12 }} />
              </>
            }
          />
          <HelpMenu context={{ gameOptions }} />
        </ErrorBoundary>
      </ScrollView>
    </GameProvider>
  );
};

export { StartScreen };
