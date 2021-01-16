import React, { FC, useContext } from "react";
import { GameContext, Piece as PieceClass, TokenName, PlayerName } from "game";
import { PieceImage, Colors } from "primitives";

interface Props {
  piece: PieceClass;
  size: number;
}

const Piece: FC<Props> = ({ piece, size }) => {
  const { gameMaster } = useContext(GameContext);
  return (
    <PieceImage
      type={piece.name}
      color={Colors.PLAYER[piece.owner].string()}
      size={size}
      rotatePiece={gameMaster?.overTheBoard && piece.owner === PlayerName.Black}
      opacity={piece.hasTokenWithName(TokenName.Fatigue) ? 0.4 : 1}
    />
  );
};

export { Piece };
