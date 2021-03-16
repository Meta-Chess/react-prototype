import React, { FC, useContext } from "react";
import { Piece as PieceClass, TokenName, PlayerName } from "game";
import { PieceImage, Colors } from "primitives";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { getPieceDecorationNames } from "./getPieceDecorationNames";
import { GameContext } from "components/shared";

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
  onPress?: () => void;
}

const Piece: FC<Props> = ({
  piece,
  size,
  color,
  outlineColor,
  glowColor,
  animatedData,
  onPress,
}) => {
  const { gameMaster } = useContext(GameContext);
  if (piece === undefined) return null;

  const pieceDecorationNames = getPieceDecorationNames(piece, gameMaster?.getRuleNames());

  const animated = animatedData !== undefined;
  const chosenColor = color
    ? color
    : animated
    ? undefined
    : Colors.PLAYER[piece.owner].string();
  const PieceImageComponent = (
    <PieceImage
      type={piece.name}
      color={chosenColor}
      outlineColor={outlineColor}
      size={size}
      rotatePiece={gameMaster?.overTheBoard && piece.owner === PlayerName.Black}
      opacity={
        piece.hasTokenWithName(TokenName.Fatigue) &&
        gameMaster?.getRuleNames().includes("fatigue")
          ? 0.4
          : 1
      }
      glowColor={glowColor}
      animatedColor={animated ? animatedData?.animatedColor : undefined}
      animatedOutlineColor={animated ? animatedData?.animatedOutlineColor : undefined}
      pieceDecorationNames={pieceDecorationNames}
    />
  );
  return onPress ? (
    <PressableContainer size={size} onPress={onPress}>
      {PieceImageComponent}
    </PressableContainer>
  ) : (
    PieceImageComponent
  );
};

const PressableContainer = styled(TouchableOpacity)<{ size: number }>`
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
  border-radius: 50%;
  overflow: visible;
`;

export { Piece };
