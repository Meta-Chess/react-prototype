import React, { FC } from "react";
import { GameProvider } from "game";
import { Screens, useRoute } from "navigation";
import { GameScreenContent } from "./GameScreenContent";

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
