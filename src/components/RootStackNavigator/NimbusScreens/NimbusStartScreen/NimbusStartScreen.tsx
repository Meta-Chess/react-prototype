import React, { FC } from "react";
import { Colors, TrackingPixel } from "primitives";
import { ShadowBoard } from "../../StartScreen/ShadowBoard";
import { StartScreenLayoutContainer } from "../../StartScreen/StartScreenLayoutContainer";
import { GameProvider, StaticBoardViewProvider } from "components/shared";
import { ScrollView, useWindowDimensions } from "react-native";
import { ErrorBoundary } from "components/shared/ErrorBoundary";
import { useIsFocused } from "@react-navigation/native";
import { GameOptions } from "game";
import { PlayOnline } from "./PlayOnline";
import { PlayNow } from "./PlayNow";
import { Links } from "./Links";
import { NimbusLogo } from "primitives";

const NimbusStartScreen: FC = () => {
  const { height, width } = useWindowDimensions();
  const screenIsFocused = useIsFocused();

  const generateGameOptions = (): GameOptions => ({
    checkEnabled: false,
    time: undefined,
    online: false,
    flipBoard: false,
    baseVariants: ["nimbus"],
    numberOfPlayers: 2,
    format: "variantComposition",
  });

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
                  <NimbusLogo />
                </GameProvider>
              ) : null
            }
            secondaryComponent={
              <>
                <PlayNow />
                <PlayOnline style={{ marginTop: 12 }} />
                <Links style={{ marginTop: 12 }} />
              </>
            }
          />
          {/* <NimbusHelpMenu /> TODO: parameterize existing HelpMenu? */}
        </ErrorBoundary>
      </ScrollView>
      <TrackingPixel urlEnd={"NimbusStartScreen"} />
    </>
  );
};

export { NimbusStartScreen };
