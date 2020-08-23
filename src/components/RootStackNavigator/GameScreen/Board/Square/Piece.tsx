import React, { FC } from "react";
import { PieceImage, Colors } from "primitives";
import { Piece as PieceClass } from "domain/Game/Board";

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
    />
  );
};

export { Piece };
