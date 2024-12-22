import React, { createContext, FC, useContext } from "react";
import {
  BoardVisualisationFields,
  getDefaultBoardVisualisation,
  useBoardVisualisation,
} from "./Board";
import { Colors } from "primitives";
import Color from "color";
import { GameContext } from "components/shared/GameContext";

type BoardView = BoardVisualisationFields & {
  autoRotateCamera: boolean;
  initialCameraPosition: [number, number, number];
  backgroundColor: Color;
};

export const BoardViewContext = createContext<BoardView>({
  boardVisualisation: "flat",
  possibleBoardVisualisations: ["flat"],
  autoRotateCamera: false,
  initialCameraPosition: [0, 0, 40],
  backgroundColor: Colors.BLACK,
});

export const StaticBoardViewProvider: FC<Partial<BoardView>> = ({
  boardVisualisation,
  autoRotateCamera = false,
  initialCameraPosition = [0, 0, 40],
  backgroundColor = Colors.BLACK,
  children,
}) => {
  const { gameMaster } = useContext(GameContext);
  boardVisualisation = boardVisualisation ?? getDefaultBoardVisualisation(gameMaster);

  return (
    <BoardViewContext.Provider
      value={{
        boardVisualisation,
        possibleBoardVisualisations: [boardVisualisation],
        autoRotateCamera,
        initialCameraPosition,
        backgroundColor,
      }}
    >
      {children}
    </BoardViewContext.Provider>
  );
};

export const BoardViewProvider: FC = ({ children }) => {
  const boardVisualisationFields = useBoardVisualisation();

  return (
    <BoardViewContext.Provider
      value={{
        ...boardVisualisationFields,
        autoRotateCamera: false,
        initialCameraPosition: [0, 0, 40],
        backgroundColor: Colors.BLACK,
      }}
    >
      {children}
    </BoardViewContext.Provider>
  );
};
