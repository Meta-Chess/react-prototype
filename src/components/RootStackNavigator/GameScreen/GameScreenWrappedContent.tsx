import React, { FC, useContext } from "react";
import { GameScreenContent } from "./GameScreenContent";
import { BoardViewProvider, GameContext, ScreenContainer } from "components/shared";
import { Spinner } from "ui";

export const GameScreenWrappedContent: FC = () => {
  const { gameMaster } = useContext(GameContext);

  if (!gameMaster)
    return (
      <ScreenContainer>
        <Spinner />
      </ScreenContainer>
    );

  return (
    <BoardViewProvider>
      <GameScreenContent />
    </BoardViewProvider>
  );
};
