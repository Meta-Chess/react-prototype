import React, { FC } from "react";
import { PieceImage, Colors } from "primitives";
import { Piece as PieceClass } from "game/Board";
import { TokenName } from "game/types";

interface Props {
  piece: PieceClass;
  size: number;
}

const Piece: FC<Props> = ({ piece, size }) => {
  return (
    <PieceImage
      type={piece.name}
      color={Colors.PLAYER[piece.owner].string()}
      size={size}
      opacity={piece.hasTokenWithName(TokenName.Fatigue) ? 0.4 : 1}
    />
  );
};

export { Piece };
