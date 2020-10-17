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

  useEffect((): (() => void) | undefined => {
    const boardShouldBeFlipped = currentPlayer === Player.Black && flipBoardEnabled;
    if (flipBoard !== boardShouldBeFlipped) {
      const timer = setTimeout(() => {
        setFlipBoard(boardShouldBeFlipped);
      }, delay);
      return (): void => clearTimeout(timer);
    }
  }, [currentPlayer, flipBoard, setFlipBoard, delay, flipBoardEnabled]);

  return { flipBoard };
};
