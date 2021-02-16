import React, { FC, useContext } from "react";
import { GameContext, Piece as PieceClass, TokenName, PlayerName } from "game";
import { PieceImage, Colors } from "primitives";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface animatedData {
  animatedColor: Animated.AnimatedInterpolation;
  animatedOutlineColor: Animated.AnimatedInterpolation;
}

interface Props {
  piece?: PieceClass;
  size: number;
  glowColor?: string;
  animatedData?: animatedData;
  onPress?: () => void;
}

const Piece: FC<Props> = ({ piece, size, glowColor, animatedData, onPress }) => {
  const { gameMaster } = useContext(GameContext);
  if (piece === undefined) return null;
  const animated = animatedData !== undefined;
  const PieceImageComponent = (
    <PieceImage
      type={piece.name}
      color={animated ? undefined : Colors.PLAYER[piece.owner].string()}
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
