import React, { FC, useContext } from "react";
import { Piece as PieceClass, PlayerName, SquareShape, TokenName } from "game";
import { Colors, PieceImage } from "primitives";
import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { getPieceDecorationNames } from "./getPieceDecorationNames";
import { GameContext } from "components/shared";
import type { GameMaster } from "game";
import Color from "color";

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
  ignoreTokens?: boolean;
  squareShape?: SquareShape;
}

const Piece: FC<Props> = ({
  piece,
  size,
  color,
  outlineColor,
  glowColor,
  animatedData,
  onPress,
  ignoreTokens,
  squareShape,
}) => {
  const { gameMaster } = useContext(GameContext);

  if (piece === undefined) return null;

  const pieceDecorationNames = getPieceDecorationNames(piece, gameMaster);

  const animated = animatedData !== undefined;
  const chosenColor = getPieceColor(piece, animated, color, gameMaster);

  const PieceImageComponent = (
    <PieceImage
      type={piece.name}
      color={chosenColor}
      outlineColor={outlineColor}
      size={size}
      rotatePiece={gameMaster?.overTheBoard && piece.owner === PlayerName.Black}
      opacity={
        piece.hasTokenWithName(TokenName.Fatigue) &&
        !ignoreTokens &&
        gameMaster?.getRuleNames().includes("fatigue")
          ? 0.4
          : 1
      }
      glowColor={glowColor}
      animatedColor={animated ? animatedData?.animatedColor : undefined}
      animatedOutlineColor={animated ? animatedData?.animatedOutlineColor : undefined}
      pieceDecorationNames={pieceDecorationNames}
      squareShape={squareShape}
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

function getPieceColor(
  piece: PieceClass,
  animated: boolean,
  color?: string,
  gameMaster?: GameMaster
): string | undefined {
  const playerColors = [...Colors.PLAYER];

  const rules = gameMaster?.getRuleNames();
  if (rules?.includes("nimbus")) {
    playerColors[0] = Colors.NIMBUS.PLAYER[0];
    playerColors[1] = Colors.NIMBUS.PLAYER[1];
  }

  const chosenColor = color
    ? color
    : animated
    ? undefined
    : playerColors[piece.owner].string();

  return chosenColor;
}
