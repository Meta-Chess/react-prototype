import React, { FC, ReactElement } from "react";
import { Path } from "react-native-svg";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";

interface Props {
  pieceDecorationNames?: PieceDecorationName[];
}

function CHOOSE_DECORATION(name: PieceDecorationName): ReactElement | void {
  if (name === PieceDecorationName.UpDirectionArrow) {
    return (
      <Path d="M 22.5,17.5 22.5,24.5 22.5,24.5 M 22.5,17.5 20,20 M 22.5,17.5 25,20" />
    );
  } else if (name === PieceDecorationName.DownDirectionArrow) {
    return (
      <Path d="M 22.5,17.5 22.5,24.5 22.5,24.5 M 22.5,24.5 20,22 M 22.5,24.5 25,22" />
    );
  }
  return;
}

const PieceDecorations: FC<Props> = ({ pieceDecorationNames }) => {
  if (pieceDecorationNames === undefined) return null;
  return (
    <>
      {pieceDecorationNames?.map((pieceDecorationName) => {
        return CHOOSE_DECORATION(pieceDecorationName);
      })}
    </>
  );
};

export { PieceDecorations };
