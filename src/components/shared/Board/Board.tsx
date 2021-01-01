import React, { useContext, FC, useState, useCallback } from "react";
import { GameContext } from "game";
import { TokenName, SquareShape } from "game/types";
import { HexBoard } from "./HexBoard";
import { SquareBoard } from "./SquareBoard";
import { BoardMeasurements } from "./calculateBoardMeasurements";
import { WinModal } from "./WinModal";
import { AbsoluteView } from "ui";
import { MoveDisambiguationModal } from "components/shared/Board/MoveDisambiguationModal";

export interface BoardProps {
  backboard?: boolean;
  measurements: BoardMeasurements;
  flipBoard?: boolean;
}

export const Board: FC<BoardProps> = (props) => {
  const { gameMaster } = useContext(GameContext);
  const shapeToken = gameMaster?.game.board.firstTokenWithName(TokenName.Shape);
  const [winModalHidden, setWinModalHidden] = useState(false);
  const hideWinModal = useCallback(() => setWinModalHidden(true), []);

  const moveDisambiguationRequired =
    gameMaster?.locationSelected && (gameMaster?.allowableMoves.length || 0) > 1;

  return (
    <>
      {shapeToken?.data?.shape === SquareShape.Hex ? (
        <HexBoard {...props} />
      ) : (
        <SquareBoard {...props} />
      )}
      {gameMaster?.gameOver && !winModalHidden ? (
        <AbsoluteView>
          <WinModal onClose={hideWinModal} />
        </AbsoluteView>
      ) : moveDisambiguationRequired ? (
        <AbsoluteView>
          <MoveDisambiguationModal />
        </AbsoluteView>
      ) : null}
    </>
  );
};
