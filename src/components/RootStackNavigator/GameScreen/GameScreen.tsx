import React, { FC } from "react";
import { TrackingPixel } from "primitives";
import { Screens, useRoute } from "navigation";
import { GameProvider } from "components/shared";
import { GameScreenWrappedContent } from "./GameScreenWrappedContent";

export const GameScreen: FC = () => {
  const { params } = useRoute<Screens.GameScreen>();
  return (
    <GameProvider {...params}>
      <GameScreenWrappedContent />
      <TrackingPixel urlEnd={"GameScreen"} />
    </GameProvider>
  );
};
