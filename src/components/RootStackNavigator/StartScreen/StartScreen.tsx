import React, { FC, useCallback, useEffect, useState } from "react";
import { Colors, DISCORD_URL, DiscordIcon, MChessLogo, TrackingPixel } from "primitives";
import { calculateGameOptions } from "game";
import { ShadowBoard } from "./ShadowBoard";
import { StartScreenLayoutContainer } from "./StartScreenLayoutContainer";
import {
  GameProvider,
  HelpMenu,
  StaticBoardViewProvider,
  useAsyncStorage,
} from "components/shared";
import { Lobby } from "./Lobby";
import { PlayWithFriends } from "./PlayWithFriends";
import { Linking, Platform, ScrollView, useWindowDimensions } from "react-native";
import { ErrorBoundary } from "components/shared/ErrorBoundary";
import { IconButton } from "ui/Buttons/IconButton";
import { UpdateLog } from "./UpdateLog";
import { recentUpdates } from "./UpdateLog/updates";
import { useLogin } from "./useLogin";
import { randomChoice } from "utilities";

const StartScreen: FC = () => {
  useLogin();
  const { height, width } = useWindowDimensions();
  const [setLastViewedUpdateOn, getLastViewedUpdateOn] =
    useAsyncStorage("lastViewedUpdateOn");
  const [showUpdateLog, setShowUpdateLog] = useState(false);
  const UPDATE_LOG_ENABLED = false; // disabling UpdateLog for now, while it isn't being updated

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

  const generateGameOptions = useCallback(
    () =>
      calculateGameOptions(
        { checkEnabled: false, time: undefined, online: false, flipBoard: false },
        [
          randomChoice([
            "mobius",
            "spherical",
            "cylindrical",
            "hex",
            "atomic",
            "toroidal",
          ]),
        ]
      ),
    []
  );

  return (
    <>
      <GameProvider generateGameOptions={generateGameOptions} autoPlay>
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
                  <StaticBoardViewProvider
                    autoRotateCamera={true}
                    initialCameraPosition={[0, 10, 35]}
                    backgroundColor={Colors.DARKEST}
                  >
                    <ShadowBoard />
                  </StaticBoardViewProvider>
                  <MChessLogo />
                </>
              }
              secondaryComponent={
                <>
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

            <HelpMenu openChangeLog={(): void => setShowUpdateLog(true)} />
          </ErrorBoundary>
        </ScrollView>
        {showUpdateLog && UPDATE_LOG_ENABLED && (
          <UpdateLog
            updates={recentUpdates}
            onDismiss={onDismiss}
            windowHeight={height}
          />
        )}
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
  const lastDateToNotShowUpdate = new Date();
  lastDateToNotShowUpdate.setDate(lastViewedUpdateOnDate.getDate() + 7);
  return now > lastDateToNotShowUpdate;
}

export { StartScreen };
