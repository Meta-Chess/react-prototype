import { useContext, useEffect, useState } from "react";
import { GameContext } from "game";

export const useFlipDelay = (
  currentPlayerIndex?: number,
  delay = 400
): { flipBoard: boolean } => {
  const [flipBoard, setFlipBoard] = useState(false);
  const { gameMaster } = useContext(GameContext);
  const flipBoardEnabled = !!gameMaster?.flipBoard;

  useEffect((): (() => void) | undefined => {
    const boardShouldBeFlipped = currentPlayerIndex !== 0 && flipBoardEnabled;
    if (flipBoard !== boardShouldBeFlipped) {
      const timer = setTimeout(() => {
        setFlipBoard(boardShouldBeFlipped);
      }, delay);
      return (): void => clearTimeout(timer);
    }
  }, [currentPlayerIndex, flipBoard, setFlipBoard, delay, flipBoardEnabled]);

  return { flipBoard };
};
