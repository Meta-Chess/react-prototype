import React, { FC, useCallback, useEffect, useState } from "react";
import { Colors, DiscordIcon, MChessLogo, TrackingPixel, DISCORD_URL } from "primitives";
import { GameOptions, defaultGameOptions } from "game";
import { ShadowBoard } from "./ShadowBoard";
import { StartScreenLayoutContainer } from "./StartScreenLayoutContainer";
import { GameProvider, HelpMenu, useAsyncStorage } from "components/shared";
import { Lobby } from "./Lobby";
import { SpotlightGame } from "./SpotlightGame";
import { PlayWithFriends } from "./PlayWithFriends";
import { ScrollView, Linking, Platform, useWindowDimensions } from "react-native";
import { ErrorBoundary } from "components/shared/ErrorBoundary";
import { IconButton } from "ui/Buttons/IconButton";
import { UpdateLog } from "./UpdateLog";

const StartScreen: FC = () => {
  const { height, width } = useWindowDimensions();
  const [setLastViewedUpdateOn, getLastViewedUpdateOn] =
    useAsyncStorage("lastViewedUpdateOn");
  const [showUpdateLog, setShowUpdateLog] = useState(false);

  useEffect(() => {
    async function setStateAsynchronously(): Promise<void> {
      setShowUpdateLog(await shouldShowUpdateLog(getLastViewedUpdateOn()));
    }
    setStateAsynchronously();
  }, []);

  const onDismiss = useCallback(() => {
    setShowUpdateLog(false);
    setLastViewedUpdateOn(new Date(Date.now()));
  }, []);

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
              windowWidth={width}
              windowHeight={height}
              primaryComponent={
                <>
                  <ShadowBoard />
                  <MChessLogo />
                </>
              }
              secondaryComponent={
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

            <HelpMenu
              context={{ gameOptions }}
              openChangeLog={(): void => setShowUpdateLog(true)}
            />
          </ErrorBoundary>
        </ScrollView>
        {showUpdateLog && <UpdateLog onDismiss={onDismiss} windowHeight={height} />}
      </GameProvider>
      <TrackingPixel urlEnd={"StartScreen"} />
    </>
  );
};

async function shouldShowUpdateLog(
  lastViewedUpdateOn: Promise<Date | undefined>
): Promise<boolean> {
  const lastViewedUpdateOnDate = await lastViewedUpdateOn;
  if (!lastViewedUpdateOnDate) return true;
  const now = new Date(Date.now());
  lastViewedUpdateOnDate.setDate(lastViewedUpdateOnDate.getDate() + 7);
  return now > lastViewedUpdateOnDate;
}

export { StartScreen };
