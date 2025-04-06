import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Colors, DISCORD_URL, DiscordIcon, MChessLogo, TrackingPixel } from "primitives";
import { calculateGameOptions, FutureVariantName } from "game";
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
import { shuffleInPlace } from "utilities";
import { useIsFocused } from "@react-navigation/native";

const BACKGROUND_VARIANTS: FutureVariantName[] = [
  "mobius",
  "spherical",
  "cylindrical",
  "hex",
  "atomic",
  "toroidal",
];

const StartScreen: FC = () => {
  useLogin();
  const { height, width } = useWindowDimensions();
  const [setLastViewedUpdateOn, getLastViewedUpdateOn] =
    useAsyncStorage("lastViewedUpdateOn");
  const [showUpdateLog, setShowUpdateLog] = useState(false);
  const screenIsFocused = useIsFocused();
  const unusedBackgroundVariantsRef = useRef<FutureVariantName[]>([]);
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

  const generateGameOptions = useCallback(() => {
    if (!unusedBackgroundVariantsRef.current.length) {
      unusedBackgroundVariantsRef.current = shuffleInPlace([...BACKGROUND_VARIANTS]);
    }
    const variant = unusedBackgroundVariantsRef.current.pop();
    return calculateGameOptions(
      { checkEnabled: false, time: undefined, online: false, flipBoard: false },
      variant ? [variant] : []
    );
  }, []);

  return (
    <>
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
              screenIsFocused ? (
                <GameProvider generateGameOptions={generateGameOptions} autoPlay>
                  <StaticBoardViewProvider
                    autoRotateCamera={true}
                    initialCameraPosition={[0, 10, 35]}
                    backgroundColor={Colors.DARKEST}
                  >
                    <ShadowBoard />
                  </StaticBoardViewProvider>
                  <MChessLogo />
                </GameProvider>
              ) : null
            }
            secondaryComponent={
              <>
                <PlayWithFriends style={{ marginTop: 12 }} />
                <Lobby style={{ marginTop: 12 }} />
              </>
            }
          />
          <IconButton
            style={{ position: "absolute", top: 42, right: 8 }}
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
        <UpdateLog updates={recentUpdates} onDismiss={onDismiss} windowHeight={height} />
      )}
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
