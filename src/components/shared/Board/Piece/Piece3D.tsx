import React, { FC, useContext } from "react";
import { Piece as PieceClass, TokenName } from "game";
import { Colors, PieceImage3D } from "primitives";
import { Animated } from "react-native";
import { getPieceDecorationNames } from "./getPieceDecorationNames";
import { GameContext } from "components/shared";
import { Vector3 } from "three";

interface animatedData {
  animatedColor: Animated.AnimatedInterpolation;
  animatedOutlineColor: Animated.AnimatedInterpolation;
}

interface Props {
  piece?: PieceClass;
  size: number;
  color?: string;
  outlineColor?: string;
  glowColor?: string;
  animatedData?: animatedData;
  ignoreTokens?: boolean;
  position: Vector3;
}

export const Piece3D: FC<Props> = ({
  piece,
  color,
  outlineColor,
  animatedData,
  ignoreTokens,
  ...moreProps
}) => {
  const { gameMaster } = useContext(GameContext);

  if (piece === undefined) return null;

  const pieceDecorationNames = getPieceDecorationNames(piece, gameMaster);

  const animated = animatedData !== undefined;
  const chosenColor = color
    ? color
    : animated
    ? undefined
    : Colors.PLAYER[piece.owner].string();
  return (
    <PieceImage3D
      type={piece.name}
      color={chosenColor}
      outlineColor={outlineColor}
      opacity={
        piece.hasTokenWithName(TokenName.Fatigue) &&
        !ignoreTokens &&
        gameMaster?.getRuleNames().includes("fatigue")
          ? 0.4
          : 1
      }
      animatedColor={animated ? animatedData?.animatedColor : undefined}
      animatedOutlineColor={animated ? animatedData?.animatedOutlineColor : undefined}
      pieceDecorationNames={pieceDecorationNames}
      {...moreProps}
    />
  );
};