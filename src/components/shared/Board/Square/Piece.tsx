import React, { FC, useContext } from "react";
import { GameContext } from "game";
import { PieceImage, Colors } from "primitives";
import { Piece as PieceClass } from "game/Board";
import { TokenName, Player } from "game/types";

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
      rotatePiece={gameMaster?.overTheBoard && piece.owner === Player.Black}
      opacity={piece.hasTokenWithName(TokenName.Fatigue) ? 0.4 : 1}
    />
  );
};

export { Piece };
