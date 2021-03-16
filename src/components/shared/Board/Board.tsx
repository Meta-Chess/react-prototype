import React, { useContext, FC } from "react";
import { TokenName, SquareShape } from "game";
import { HexBoard } from "./HexBoard";
import { SquareBoard } from "./SquareBoard";
import { BoardMeasurements } from "./calculateBoardMeasurements";
import { GameContext } from "components/shared";

export interface BoardProps {
  backboard?: boolean;
  measurements: BoardMeasurements;
  flipBoard?: boolean;
}

export const Board: FC<BoardProps> = (props) => {
  const { gameMaster } = useContext(GameContext);
  const shapeToken = gameMaster?.game.board.firstTokenWithName(TokenName.Shape);

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
