import React, { FC, useContext } from "react";
import { GameContext, Piece as PieceClass, TokenName, PlayerName } from "game";
import { PieceImage, Colors } from "primitives";
import { Animated } from "react-native";

interface animatedData {
  animatedColor: Animated.AnimatedInterpolation;
  animatedOutlineColor: Animated.AnimatedInterpolation;
}

interface Props {
  piece?: PieceClass;
  animatedData?: animatedData;
  size: number;
}

const Piece: FC<Props> = ({ piece, animatedData, size }) => {
  const { gameMaster } = useContext(GameContext);
  if (piece === undefined) return null;
  const animated = animatedData !== undefined;
  return (
    <PieceImage
      type={piece.name}
      color={animated ? undefined : Colors.PLAYER[piece.owner].string()}
      size={size}
      rotatePiece={gameMaster?.overTheBoard && piece.owner === PlayerName.Black}
      opacity={piece.hasTokenWithName(TokenName.Fatigue) ? 0.4 : 1}
      animatedColor={animated ? animatedData?.animatedColor : undefined}
      animatedOutlineColor={animated ? animatedData?.animatedOutlineColor : undefined}
    />
  );
};

export { Piece };
