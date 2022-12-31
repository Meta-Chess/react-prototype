import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { GameMaster } from "game";
import { GameContext } from "components/shared";
import { uniq } from "lodash";

export type BoardType3D = "spherical" | "toroidal" | "mobius" | "cylindrical";
export type BoardType = BoardType3D | "flat" | "circular";

// TODO: This logic should be within each variant, and here we should just have an interruption point
export const getPossibleBoards = (gameMaster?: GameMaster): BoardType[] => {
  const possibleBoards: BoardType[] = ["flat"];
  if (gameMaster?.getRuleNames().includes("verticallyCylindrical"))
    possibleBoards.push("circular");
  if (gameMaster?.getRuleNames().includes("polar")) possibleBoards.push("spherical");
  if (
    gameMaster?.getRuleNames().includes("cylindrical") &&
    !gameMaster?.getRuleNames().includes("verticallyCylindrical") &&
    !gameMaster?.getRuleNames().includes("polar")
  )
    possibleBoards.push("cylindrical");
  if (
    gameMaster?.getRuleNames().includes("cylindrical") &&
    gameMaster?.getRuleNames().includes("verticallyCylindrical")
  )
    possibleBoards.push("toroidal");
  if (gameMaster?.getRuleNames().includes("mobius")) possibleBoards.push("mobius");
  return uniq(possibleBoards);
};

export const useBoardType = (
  boardTypeOverride?: BoardType
): { boardType: BoardType; possibleBoards: BoardType[] } => {
  const { gameMaster } = useContext(GameContext);

  const possibleBoards = useMemo(
    () => getPossibleBoards(gameMaster),
    [gameMaster?.getRuleNames()]
  );
  const defaultBoardType = useMemo(
    (): BoardType =>
      gameMaster?.getRuleNames().includes("cylindrical") &&
      gameMaster?.getRuleNames().includes("verticallyCylindrical")
        ? "toroidal"
        : gameMaster?.getRuleNames().includes("mobius")
        ? "mobius"
        : gameMaster?.getRuleNames().includes("longBoard") &&
          gameMaster?.getRuleNames().includes("verticallyCylindrical")
        ? "circular"
        : gameMaster?.getRuleNames().includes("polar")
        ? "spherical"
        : gameMaster?.getRuleNames().includes("cylindrical")
        ? "cylindrical"
        : "flat",
    [gameMaster?.getRuleNames()]
  );

  const [boardType, setBoardType] = useState<BoardType>(defaultBoardType);
  const pressRef = useRef<BoardType>(defaultBoardType);

  // TODO: extract this keypressing logic from here (and other places)
  const onKeypressEvent = useCallback((event) => {
    switch (event.key) {
      case "e":
      case "E":
        if (possibleBoards.length > 1) {
          pressRef.current = nextBoard(pressRef.current, possibleBoards); // relies on uniqueness of possible boards
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
    setBoardType(pressRef.current);
  }, [pressRef.current]);

  return {
    boardType: boardTypeOverride ?? boardType,
    possibleBoards,
  };
};

function nextBoard(currentBoard: BoardType, possibleBoards: BoardType[]): BoardType {
  return possibleBoards[
    (possibleBoards.findIndex((x) => x === currentBoard) + 1) % possibleBoards.length
  ];
}
