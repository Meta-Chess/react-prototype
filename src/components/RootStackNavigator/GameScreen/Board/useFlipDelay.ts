import { Player } from "game/types";
import { useEffect, useState } from "react";

export const useFlipDelay = (
  currentPlayer?: Player,
  delay = 400
): { flipBoard: boolean } => {
  const [flipBoard, setFlipBoard] = useState(false);

  useEffect(() => {
    const boardShouldBeFlipped = currentPlayer === Player.Black;
    if (flipBoard !== boardShouldBeFlipped) {
      setTimeout(() => {
        setFlipBoard(boardShouldBeFlipped);
      }, delay);
    }
  }, [currentPlayer, flipBoard, setFlipBoard, delay]);

  return { flipBoard };
};
