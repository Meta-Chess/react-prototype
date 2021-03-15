import React, { FC } from "react";
import { Screens, useRoute } from "navigation";
import { GameScreenContent } from "./GameScreenContent";
import { GameProvider } from "components/shared";

interface Props {
  portrait: boolean;
}

export const GameScreen: FC<Props> = () => {
  const { params } = useRoute<Screens.GameScreen>();
  return (
    <GameProvider {...params}>
      <GameScreenContent />
    </GameProvider>
  );
};
