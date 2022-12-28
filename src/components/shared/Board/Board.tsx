import React, { FC, useContext } from "react";
import { SquareShape, TokenName } from "game";
import { HexBoard } from "./HexBoard";
import { BoardMeasurements } from "./calculateBoardMeasurements";
import { GameContext } from "components/shared";
import { CircularBoard } from "./CircularBoard";
import { useCircularBoard } from "./useCircularBoard";
import { SphericalBoard } from "components/shared/Board/SphericalBoard";

export interface BoardProps {
  backboard?: boolean;
  measurements: BoardMeasurements;
  flipBoard?: boolean;
  circularBoard?: boolean;
}

export const Board: FC<BoardProps> = (props) => {
  const { gameMaster } = useContext(GameContext);
  const shapeToken = gameMaster?.game.board.firstTokenWithName(TokenName.Shape);

  const setCircularBoard = useCircularBoard();
  const showCircularBoard = props.circularBoard ?? setCircularBoard;

  if (showCircularBoard) {
    return <CircularBoard {...props} />;
  }
  return (
    <>
      {shapeToken?.data?.shape === SquareShape.Hex ? (
        <HexBoard {...props} />
      ) : (
        <SphericalBoard {...props} />
      )}
    </>
  );
};
