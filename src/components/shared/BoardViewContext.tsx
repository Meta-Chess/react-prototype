import React, { createContext, FC, ReactNode } from "react";
import { BoardVisualisationFields, useBoardVisualisation } from "./Board";
import { Colors } from "primitives";
import Color from "color";

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

export const StaticBoardViewProvider: FC<
  Partial<BoardView> & { children?: ReactNode }
> = ({
  boardVisualisation = "flat",
  autoRotateCamera = false,
  initialCameraPosition = [0, 0, 40],
  backgroundColor = Colors.BLACK,
  children,
}) => {
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

export const BoardViewProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
