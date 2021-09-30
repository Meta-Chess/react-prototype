import React, { FC, ReactElement, useMemo, useEffect } from "react";
import { Path } from "react-native-svg";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";
import { BsArrowClockwise, BsArrowCounterclockwise } from "react-icons/bs";
import { GameMaster } from "game";
import { TokenName, SquareShape } from "game/types";
import { Svg } from "react-native-svg";
interface Props {
  pieceDecorationNames?: PieceDecorationName[];
  gameMaster?: GameMaster;
}

// TODO: change this into a map...
function CHOOSE_DECORATION(
  name: PieceDecorationName,
  circularBoard: boolean
): ReactElement | void {
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
const PieceDecorations: FC<Props> = ({ pieceDecorationNames, gameMaster }) => {
  // change decorations when displaying a circular board
  const circularBoard = useMemo(
    () =>
      gameMaster?.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape ===
      SquareShape.Arc,
    [gameMaster?.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape]
  );
  useEffect(
    () => gameMaster?.render(),
    [gameMaster?.game.board.firstTokenWithName(TokenName.Shape)?.data?.shape]
  );

  if (pieceDecorationNames === undefined) return null;

  return (
    <>
      {pieceDecorationNames?.map((pieceDecorationName) => {
        return CHOOSE_DECORATION(pieceDecorationName, circularBoard);
      })}
    </>
  );
};

export { PieceDecorations };
