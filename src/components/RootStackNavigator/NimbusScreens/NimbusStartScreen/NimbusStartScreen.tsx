import React, { FC } from "react";
import { Colors, TrackingPixel, MChessLogo } from "primitives";
import { ShadowBoard } from "../../StartScreen/ShadowBoard";
import { StartScreenLayoutContainer } from "../../StartScreen/StartScreenLayoutContainer";
import { GameProvider, StaticBoardViewProvider } from "components/shared";
import { ScrollView, useWindowDimensions, TouchableOpacity } from "react-native";
import { ErrorBoundary } from "components/shared/ErrorBoundary";
import { useIsFocused } from "@react-navigation/native";
import { GameOptions } from "game";
import { PlayOnline } from "./PlayOnline";
import { PlayNow } from "./PlayNow";
import { Links } from "./Links";
import { NimbusLogo } from "primitives";
import { HelpMenu } from "components/shared";
import { useNavigation } from "navigation/useNavigation";
import { Screens } from "navigation/Screens";

const NimbusStartScreen: FC = () => {
  const navigation = useNavigation();

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
          <HelpMenu />
        </ErrorBoundary>
      </ScrollView>
      <TouchableOpacity
        style={{ position: "absolute", top: 10, left: 10, zIndex: 99 }}
        onPress={(): void => navigation.navigate(Screens.StartScreen)}
      >
        <MChessLogo size={80} />
      </TouchableOpacity>

      <TrackingPixel urlEnd={"NimbusStartScreen"} />
    </>
  );
};

export { NimbusStartScreen };
