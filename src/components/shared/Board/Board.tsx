import React, { FC, useContext } from "react";
import { SquareShape, TokenName } from "game";
import { HexBoard } from "./HexBoard";
import { BoardMeasurements } from "./calculateBoardMeasurements";
import { BoardViewContext, GameContext } from "components/shared";
import { CircularBoard } from "./CircularBoard";
import { SquareBoard } from "./SquareBoard";
import { TriangularHexBoard } from "./TriangularHexBoard";
import { Board3D } from "./Board3D";

export interface BoardProps {
  backboard?: boolean;
  measurements: BoardMeasurements; // TODO: the measurements should maybe care about the board type?
  flipBoard?: boolean;
}

export const Board: FC<BoardProps> = (props) => {
  const { gameMaster } = useContext(GameContext);
  const shapeToken = gameMaster?.game.board.firstTokenWithName(TokenName.Shape);
  const { boardVisualisation } = useContext(BoardViewContext);

  return (
    <>
      {shapeToken?.data?.shape === SquareShape.Hex ? (
        <HexBoard {...props} />
      ) : shapeToken?.data?.shape === SquareShape.Triangle ? (
        <TriangularHexBoard {...props} />
      ) : boardVisualisation === "circular" ? (
        <CircularBoard {...props} />
      ) : boardVisualisation === "flat" ? (
        <SquareBoard {...props} />
      ) : (
        <Board3D {...props} type={boardVisualisation} />
      )}
    </>
  );
};
