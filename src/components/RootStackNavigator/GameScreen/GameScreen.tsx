import React, { FC } from "react";
import { TrackingPixel } from "primitives";
import { Screens, useRoute } from "navigation";
import { GameProvider } from "components/shared";
import { GameScreenWrappedContent } from "./GameScreenWrappedContent";

interface Props {
  portrait: boolean;
}

export const GameScreen: FC<Props> = () => {
  const { params } = useRoute<Screens.GameScreen>();
  return (
    <GameProvider {...params}>
      <GameScreenWrappedContent />
      <TrackingPixel urlEnd={"GameScreen"} />
    </GameProvider>
  );
};
