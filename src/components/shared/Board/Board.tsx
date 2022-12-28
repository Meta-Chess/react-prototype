import React, { FC, useContext } from "react";
import { SquareShape, TokenName } from "game";
import { HexBoard } from "./HexBoard";
import { BoardMeasurements } from "./calculateBoardMeasurements";
import { GameContext } from "components/shared";
import { CircularBoard } from "./CircularBoard";
import { useBoardType } from "./useBoardType";
import { SphericalBoard } from "components/shared/Board/SphericalBoard";
import { SquareBoard } from "components/shared/Board/SquareBoard";

export interface BoardProps {
  backboard?: boolean;
  measurements: BoardMeasurements; // TODO: the measurements should care about the board type
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

  const boardType = useBoardType(boardTypeOverride);

  return (
    <>
      {boardType === "circular" ? (
        <CircularBoard {...props} />
      ) : boardType === "spherical" ? (
        <SphericalBoard {...props} />
      ) : shapeToken?.data?.shape === SquareShape.Hex ? (
        <HexBoard {...props} />
      ) : (
        <SquareBoard {...props} />
      )}
    </>
  );
};
