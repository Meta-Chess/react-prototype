import React, { FC, useContext } from "react";
import { SquareShape, TokenName } from "game";
import { HexBoard } from "./HexBoard";
import { BoardMeasurements } from "./calculateBoardMeasurements";
import { GameContext } from "components/shared";
import { CircularBoard } from "./CircularBoard";
import { useBoardType } from "./useBoardType";
import { SquareBoard } from "./SquareBoard";
import { Board3D } from "./Board3D";
import { ChangeViewsReminderModal } from "components/shared/Board/ChangeViewsReminderModal";

export interface BoardProps {
  backboard?: boolean;
  measurements: BoardMeasurements; // TODO: the measurements should maybe care about the board type?
  flipBoard?: boolean;
  circularBoard?: boolean;
}

export const Board: FC<BoardProps> = (props) => {
  const { gameMaster } = useContext(GameContext);
  const shapeToken = gameMaster?.game.board.firstTokenWithName(TokenName.Shape);

  const boardTypeOverride =
    props.circularBoard === true
      ? "circular"
      : props.circularBoard === false
      ? "flat"
      : undefined;

  const { boardType, possibleBoards } = useBoardType(boardTypeOverride);

  return (
    <>
      {boardType === "circular" ? (
        <CircularBoard {...props} />
      ) : boardType === "flat" && shapeToken?.data?.shape === SquareShape.Hex ? (
        <HexBoard {...props} />
      ) : boardType === "flat" ? (
        <SquareBoard {...props} />
      ) : (
        <Board3D {...props} type={boardType} />
      )}
      {possibleBoards.length > 1 && <ChangeViewsReminderModal />}
    </>
  );
};
