import React, { FC } from "react";
import { TrackingPixel } from "primitives";
import { Screens, useRoute } from "navigation";
import { GameProvider } from "components/shared";
import { GameScreenWrappedContent } from "components/RootStackNavigator/GameScreen/GameScreenWrappedContent";

export const NimbusGameScreen: FC = () => {
  const params = { ...useRoute<Screens.NimbusGameScreen>().params };

  if (params.gameOptions === undefined) {
    params.gameOptions = {
      baseVariants: ["nimbus"],
      numberOfPlayers: 2,
      format: "variantComposition",
      checkEnabled: false,
    };
  }

  return (
    <GameProvider {...params}>
      <GameScreenWrappedContent />
      <TrackingPixel urlEnd={"NimbusGameScreen"} />
    </GameProvider>
  );
};
