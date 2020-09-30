import { Player } from "game/types";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "game";

export const useFlipDelay = (
  currentPlayer?: Player,
  delay = 400
): { flipBoard: boolean } => {
  const [flipBoard, setFlipBoard] = useState(false);
  const { gameMaster } = useContext(GameContext);
  const flipBoardEnabled = !!gameMaster?.flipBoard;

  useEffect(() => {
    const boardShouldBeFlipped = currentPlayer === Player.Black && flipBoardEnabled;
    if (flipBoard !== boardShouldBeFlipped) {
      setTimeout(() => {
        setFlipBoard(boardShouldBeFlipped);
      }, delay);
    }
  }, [currentPlayer, flipBoard, setFlipBoard, delay, flipBoardEnabled]);

  return { flipBoard };
};
