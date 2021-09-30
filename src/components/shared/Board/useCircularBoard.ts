import { useContext, useEffect, useState, useRef, useCallback, useMemo } from "react";
import { GameMaster } from "game";
import { GameContext } from "components/shared";

export const isCircularBoardPossible = (gameMaster?: GameMaster): boolean => {
  return !!gameMaster?.getRuleNames().includes("verticallyCylindrical");
};

export const useCircularBoard = (): boolean => {
  const { gameMaster } = useContext(GameContext);

  const showCircularBoardPossible = useMemo(
    () => isCircularBoardPossible(gameMaster),
    [gameMaster?.getRuleNames().length]
  );
  const showCircularBoardDefault = useMemo(
    () =>
      !!gameMaster?.getRuleNames().includes("longBoard") &&
      !!gameMaster?.getRuleNames().includes("verticallyCylindrical"),
    [gameMaster?.getRuleNames().length]
  );

  const [showCircularBoard, setShowCircularBoard] = useState(showCircularBoardDefault);
  const pressRef = useRef(showCircularBoard);

  // TODO: extract this keypressing logic from here (and other places)
  const onKeypressEvent = useCallback((event) => {
    switch (event.key) {
      case "e":
      case "E":
        if (showCircularBoardPossible) {
          pressRef.current = !pressRef.current;
          gameMaster?.unselectAllPieces();
          gameMaster?.render();
        }
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keypress", onKeypressEvent, false);
    return (): void => {
      document.removeEventListener("keypress", onKeypressEvent, false);
    };
  }, []);

  useEffect(() => {
    setShowCircularBoard(pressRef.current);
  }, [pressRef.current]);

  return showCircularBoard;
};
