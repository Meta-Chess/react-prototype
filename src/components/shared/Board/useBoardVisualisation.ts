import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { GameMaster } from "game";
import { GameContext } from "components/shared";
import { uniq } from "lodash";
import { Platform } from "react-native";

export type BoardVisualisation3D =
  | "spherical"
  | "toroidal"
  | "mobius"
  | "cylindrical"
  | "klein";
export type BoardVisualisation = BoardVisualisation3D | "flat" | "circular";

// TODO: This logic should be within each variant, and here we should just have an interruption point
export const getPossibleBoards = (gameMaster?: GameMaster): BoardVisualisation[] => {
  const possibleBoardVisualisations: BoardVisualisation[] = ["flat"];
  if (gameMaster?.getRuleNames().includes("verticallyCylindrical"))
    possibleBoardVisualisations.push("circular");
  if (gameMaster?.getRuleNames().includes("polar"))
    possibleBoardVisualisations.push("spherical");
  if (
    gameMaster?.getRuleNames().includes("cylindrical") &&
    !gameMaster?.getRuleNames().includes("verticallyCylindrical") &&
    !gameMaster?.getRuleNames().includes("polar")
  )
    possibleBoardVisualisations.push("cylindrical");
  if (gameMaster?.getRuleNames().includes("mobius"))
    possibleBoardVisualisations.push("mobius");
  if (
    gameMaster?.getRuleNames().includes("cylindrical") &&
    gameMaster?.getRuleNames().includes("verticallyCylindrical")
  )
    possibleBoardVisualisations.push("toroidal");
  if (
    gameMaster?.getRuleNames().includes("mobius") &&
    gameMaster?.getRuleNames().includes("cylindrical") &&
    gameMaster?.getRuleNames().includes("verticallyCylindrical")
  )
    possibleBoardVisualisations.push("klein");
  return uniq(possibleBoardVisualisations);
};

export function getDefaultBoardVisualisation(
  gameMaster?: GameMaster
): BoardVisualisation {
  return Platform.OS !== "web"
    ? "flat"
    : gameMaster?.getRuleNames().includes("mobius")
    ? "mobius"
    : gameMaster?.getRuleNames().includes("cylindrical") &&
      gameMaster?.getRuleNames().includes("verticallyCylindrical")
    ? "toroidal"
    : gameMaster?.getRuleNames().includes("longBoard") &&
      gameMaster?.getRuleNames().includes("verticallyCylindrical")
    ? "circular"
    : gameMaster?.getRuleNames().includes("polar")
    ? "spherical"
    : gameMaster?.getRuleNames().includes("cylindrical")
    ? "cylindrical"
    : "flat";
}

export interface BoardVisualisationFields {
  boardVisualisation: BoardVisualisation;
  possibleBoardVisualisations: BoardVisualisation[];
  changeBoardVisualisation?: () => void;
}

export const useBoardVisualisation = (): BoardVisualisationFields => {
  const { gameMaster } = useContext(GameContext);

  const possibleBoardVisualisations = useMemo(
    () => getPossibleBoards(gameMaster),
    [gameMaster?.getRuleNames()]
  );

  const defaultBoardVisualisation = useMemo(
    (): BoardVisualisation => getDefaultBoardVisualisation(gameMaster),
    [gameMaster?.getRuleNames()]
  );

  const [boardVisualisation, setBoardVisualisation] = useState<BoardVisualisation>(
    defaultBoardVisualisation
  );
  const pressRef = useRef<BoardVisualisation>(defaultBoardVisualisation);

  const changeBoardVisualisation = useCallback(() => {
    if (possibleBoardVisualisations.length > 1) {
      pressRef.current = nextBoard(pressRef.current, possibleBoardVisualisations); // relies on uniqueness of possible boards
      gameMaster?.unselectAllPieces();
      gameMaster?.render();
    }
  }, [pressRef, gameMaster, possibleBoardVisualisations.length]);

  // TODO: extract this keypressing logic from here (and other places)
  const onKeypressEvent = useCallback(
    (event) => {
      switch (event.key) {
        case "e":
        case "E":
          changeBoardVisualisation();
          break;
      }
    },
    [changeBoardVisualisation]
  );

  useEffect(() => {
    document.addEventListener("keypress", onKeypressEvent, false);
    return (): void => {
      document.removeEventListener("keypress", onKeypressEvent, false);
    };
  }, [onKeypressEvent]);

  useEffect(() => {
    setBoardVisualisation(pressRef.current);
  }, [pressRef.current]);

  return {
    boardVisualisation,
    possibleBoardVisualisations,
    changeBoardVisualisation,
  };
};

function nextBoard(
  currentBoard: BoardVisualisation,
  possibleBoardVisualisations: BoardVisualisation[]
): BoardVisualisation {
  return possibleBoardVisualisations[
    (possibleBoardVisualisations.findIndex((x) => x === currentBoard) + 1) %
      possibleBoardVisualisations.length
  ];
}
