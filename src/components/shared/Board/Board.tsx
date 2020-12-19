import React, { useContext, FC } from "react";
import { GameContext } from "game";
import { TokenName, SquareShape } from "game/types";
import { HexBoard } from "./HexBoard";
import { SquareBoard } from "./SquareBoard";
import { BoardMeasurements } from "./calculateBoardMeasurements";
import { WinModal } from "components/shared/Modals";

export interface BoardProps {
  backboard?: boolean;
  measurements: BoardMeasurements;
  flipBoard?: boolean;
}

export const Board: FC<BoardProps> = (props) => {
  const { gameMaster } = useContext(GameContext);
  const shapeToken = gameMaster?.game.board.firstTokenWithName(TokenName.Shape);

  if (gameMaster?.gameOver)
    gameMaster.setModal({
      id: 1,
      fullScreen: true,
      content: <WinModal />,
    });

  return shapeToken?.data?.shape === SquareShape.Hex ? (
    <HexBoard {...props} />
  ) : (
    <SquareBoard {...props} />
  );
};
