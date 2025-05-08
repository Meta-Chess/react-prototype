import React, { FC } from "react";
import { TrackingPixel } from "primitives";
import { Screens, useRoute } from "navigation";
import { GameProvider } from "components/shared";
import { GameScreenWrappedContent } from "components/RootStackNavigator/GameScreen/GameScreenWrappedContent";
import { calculateGameOptions } from "game/variantAndRuleProcessing";

export const defaultNimbusGameOptions = calculateGameOptions(
  { checkEnabled: false, time: undefined, online: false, flipBoard: false },
  ["nimbus"]
);

export const NimbusGameScreen: FC = () => {
  const params = { ...useRoute<Screens.NimbusGameScreen>().params };

  if (!params.roomId && params.gameOptions === undefined) {
    params.gameOptions = defaultNimbusGameOptions;
  }

  return (
    <GameProvider {...params}>
      <GameScreenWrappedContent />
      <TrackingPixel urlEnd={"NimbusGameScreen"} />
    </GameProvider>
  );
};
