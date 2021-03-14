import { useContext, useEffect, useState } from "react";
import { GameContext, PlayerName } from "game";

export const useFlipBoard = (delay = 400): { flipBoard: boolean } => {
  const { gameMaster } = useContext(GameContext);
  const wePlayFromBlacksSide =
    !gameMaster?.getRuleNames().includes("longBoard") &&
    gameMaster?.assignedPlayer === PlayerName.Black; // This will need to be more complicated for multiplayer spherical
  const [flipBoard, setFlipBoard] = useState(false);
  const flipBoardEnabled = !!gameMaster?.flipBoard;

  const currentPlayerIndex = gameMaster?.game.currentPlayerIndex;

  useEffect((): (() => void) | undefined => {
    const boardShouldBeFlipped = flipBoardEnabled && currentPlayerIndex !== 0;
    if (flipBoard === undefined) {
      setFlipBoard(boardShouldBeFlipped);
    } else if (flipBoard !== boardShouldBeFlipped) {
      const timer = setTimeout(() => {
        setFlipBoard(boardShouldBeFlipped);
      }, delay);
      return (): void => clearTimeout(timer);
    }
  }, [
    currentPlayerIndex,
    flipBoard,
    setFlipBoard,
    delay,
    flipBoardEnabled,
    wePlayFromBlacksSide,
  ]);

  return { flipBoard: flipBoardEnabled ? flipBoard : wePlayFromBlacksSide };
};
