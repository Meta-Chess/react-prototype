import React, { FC, useState } from "react";
import { Colors, DiscordIcon, MChessLogo, TrackingPixel, DISCORD_URL } from "primitives";
import { GameOptions, defaultGameOptions } from "game";
import { ShadowBoard } from "./ShadowBoard";
import { StartScreenLayoutContainer } from "./StartScreenLayoutContainer";
import { GameProvider, HelpMenu } from "components/shared";
import { Lobby } from "./Lobby";
import { SpotlightGame } from "./SpotlightGame";
import { PlayWithFriends } from "./PlayWithFriends";
import { ScrollView, Linking, Platform } from "react-native";
import { ErrorBoundary } from "components/shared/ErrorBoundary";
import { IconButton } from "ui/Buttons/IconButton";

const StartScreen: FC = () => {
  const [gameOptions] = useState<GameOptions>(defaultGameOptions);

  return (
    <>
      <GameProvider
        gameOptions={{ ...gameOptions, time: undefined, online: false, flipBoard: false }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: Colors.DARKEST.toString(),
          }}
          showsVerticalScrollIndicator={false}
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
            <IconButton
              style={{ position: "absolute", top: 44, right: 9 }}
              Icon={DiscordIcon}
              onPress={(): void => {
                if (Platform.OS == "web") window.open(DISCORD_URL, "_blank");
                else Linking.openURL(DISCORD_URL);
              }}
            />
            <HelpMenu context={{ gameOptions }} />
          </ErrorBoundary>
        </ScrollView>
      </GameProvider>
      <TrackingPixel urlEnd={"StartScreen"} />
    </>
  );
};

export { StartScreen };
