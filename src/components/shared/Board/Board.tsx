import React, { useContext, FC } from "react";
import { GameContext } from "game";
import { TokenName, SquareShape } from "game/types";
import { HexBoard } from "./HexBoard";
import { SquareBoard } from "./SquareBoard";
import { BoardMeasurements } from "./calculateBoardMeasurements";

export interface BoardProps {
  backboard?: boolean;
  measurements: BoardMeasurements;
  flipBoard?: boolean;
}

export const Board: FC<BoardProps> = (props) => {
  const { gameMaster } = useContext(GameContext);
  const shapeToken = gameMaster?.game.board.firstTokenWithName(TokenName.Shape);
  const loading = !gameMaster || !dimensions.width;
  const animationHandler = gameMaster?.game.board.animationHandler;
  if (animationHandler?.animations.length !== 0) {
    animationHandler?.animationRun();
  }

  return (
    <>
      {shapeToken?.data?.shape === SquareShape.Hex ? (
        <HexBoard {...props} />
      ) : (
        <SquareBoard {...props} />
      )}
    </>
  );
};
