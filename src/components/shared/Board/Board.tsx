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
