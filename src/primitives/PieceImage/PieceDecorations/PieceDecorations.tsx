import React, { FC, ReactElement, useMemo } from "react";
import { Path, Svg } from "react-native-svg";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";
import { BsArrowClockwise, BsArrowCounterclockwise } from "react-icons/bs";
import { SquareShape } from "game/types";

interface Props {
  pieceDecorationNames?: PieceDecorationName[];
  squareShape?: SquareShape | undefined;
}

// TODO: consider changing this into a map...
function getDecoration(
  name: PieceDecorationName,
  circularBoard: boolean
): ReactElement | undefined {
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
  return;
}

// TODO: Probably better to extract decorations as components absolutely positioned on the PieceImage (rather than paths/svgs in here)
const PieceDecorations: FC<Props> = ({ pieceDecorationNames, squareShape }) => {
  // change decorations when displaying a circular board
  const circularBoard = useMemo(() => squareShape === SquareShape.Arc, [squareShape]);

  if (pieceDecorationNames === undefined) return null;

  return (
    <>
      {pieceDecorationNames?.map((pieceDecorationName) => {
        return getDecoration(pieceDecorationName, circularBoard);
      })}
    </>
  );
};

export { PieceDecorations };
