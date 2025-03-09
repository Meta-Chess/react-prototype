import React, { FC, Fragment, ReactNode } from "react";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";
import { SquareShape } from "game/types";
import { Path, Svg } from "react-native-svg";
import { BsArrowClockwise, BsArrowCounterclockwise } from "react-icons/bs";

interface Props {
  pieceDecorationNames?: PieceDecorationName[];
  squareShape?: SquareShape | undefined;
}

// TODO: Probably better to extract decorations as components absolutely positioned on the PieceImage (rather than paths/svgs in here)
export const DecorationsAbovePiece: FC<Props> = ({
  pieceDecorationNames,
  squareShape,
}) => {
  if (pieceDecorationNames === undefined || pieceDecorationNames.length === 0) {
    return null;
  }

  // change decorations when displaying a circular board
  const circularBoard = squareShape === SquareShape.Arc;

  return (
    <>
      {pieceDecorationNames?.map((pieceDecorationName, index) => {
        const decorations = getDecorationsAbovePiece(pieceDecorationName, circularBoard);

        return <Fragment key={index}>{decorations}</Fragment>;
      })}
    </>
  );
};

function getDecorationsAbovePiece(
  name: PieceDecorationName,
  circularBoard: boolean
): ReactNode {
  if (name === PieceDecorationName.UpDirectionArrow) {
    if (circularBoard)
      return (
        <Svg viewBox={"-17 -15.5 45 45"}>
          <BsArrowCounterclockwise key={name} viewBox={"0 0 25 25"} />
        </Svg>
      );
    return (
      <Path
        key={name}
        d="M 22.5,17.5 22.5,24.5 22.5,24.5 M 22.5,17.5 20,20 M 22.5,17.5 25,20"
      />
    );
  } else if (name === PieceDecorationName.DownDirectionArrow) {
    if (circularBoard)
      return (
        <Svg viewBox={"-17 -15.5 45 45"}>
          <BsArrowClockwise key={name} viewBox={"0 0 25 25"} />
        </Svg>
      );
    return (
      <Path
        key={name}
        d="M 22.5,17.5 22.5,24.5 22.5,24.5 M 22.5,24.5 20,22 M 22.5,24.5 25,22"
      />
    );
  }
  return null;
}
