import React, { FC, useMemo } from "react";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";
import { SquareShape } from "game/types";
import {
  getDecorationsBelowPiece,
  getDecorationsAbovePiece,
} from "./getPieceDecorations";

interface Props {
  pieceDecorationNames?: PieceDecorationName[];
  squareShape?: SquareShape | undefined;
  belowPiece?: boolean;
}

// TODO: Probably better to extract decorations as components absolutely positioned on the PieceImage (rather than paths/svgs in here)
const PieceDecorations: FC<Props> = ({
  pieceDecorationNames,
  squareShape,
  belowPiece = false,
}) => {
  // change decorations when displaying a circular board
  const circularBoard = useMemo(() => squareShape === SquareShape.Arc, [squareShape]);

  if (pieceDecorationNames === undefined) return null;

  return (
    <>
      {pieceDecorationNames?.map((pieceDecorationName, index) => {
        const decorations = belowPiece
          ? getDecorationsBelowPiece(pieceDecorationName)
          : getDecorationsAbovePiece(pieceDecorationName, circularBoard);

        return <React.Fragment key={index}>{decorations}</React.Fragment>;
      })}
    </>
  );
};

export { PieceDecorations };
