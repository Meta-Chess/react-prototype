import React, { FC, useContext } from "react";
import { Piece as PieceClass, TokenName } from "game";
import { Colors, PieceImage3D, Projection } from "primitives";
import { Animated } from "react-native";
import { getPieceDecorationNames } from "./getPieceDecorationNames";
import { GameContext } from "components/shared";
import { ThreeEvent } from "@react-three/fiber";

interface animatedData {
  animatedColor: Animated.AnimatedInterpolation;
  animatedOutlineColor: Animated.AnimatedInterpolation;
}

interface Props {
  piece?: PieceClass;
  size?: number;
  color?: string;
  outlineColor?: string;
  glowColor?: string;
  animatedData?: animatedData;
  ignoreTokens?: boolean;
  coordinates: {
    rank: number;
    file: number;
    numberOfRanks: number;
    numberOfFiles: number;
  };
  projection: Projection;
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
}

export const Piece3D: FC<Props> = ({
  piece,
  color,
  animatedData, // TODO: animation handling
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
      // TODO: This logic is probably duplicate and could be extracted
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
