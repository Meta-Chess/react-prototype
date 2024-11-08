import React from "react";
import { PieceName, SquareShape } from "game";
import { G, Svg } from "react-native-svg";
import { Colors } from "../Colors";
import {
  Bishop,
  BishopKnight,
  FirePiece,
  King,
  Knight,
  Pawn,
  Queen,
  Rook,
  RookKnight,
} from "./sprites";
import { SFC } from "primitives/SFC";
import { Animated } from "react-native";
import { AnimatedGroup } from "primitives";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";
import { PieceDecorations } from "./PieceDecorations";

interface Props {
  type: PieceName;
  color?: string | undefined;
  outlineColor?: string | undefined;
  size: number;
  opacity?: number;
  rotatePiece?: boolean;
  glowColor?: string;
  animated?: boolean;
  animatedColor?: Animated.AnimatedInterpolation | undefined;
  animatedOutlineColor?: Animated.AnimatedInterpolation | undefined;
  pieceDecorationNames?: PieceDecorationName[];
  squareShape?: SquareShape | undefined;
}

const PIECE_SPRITE: { [name in PieceName]: React.ReactNode } = {
  [PieceName.Pawn]: <Pawn />,
  [PieceName.Knight]: <Knight />,
  [PieceName.Bishop]: <Bishop />,
  [PieceName.Rook]: <Rook />,
  [PieceName.Queen]: <Queen />,
  [PieceName.King]: <King />,
  [PieceName.BishopKnight]: <BishopKnight />,
  [PieceName.RookKnight]: <RookKnight />,
  [PieceName.FirePiece]: <FirePiece />,
};

const PieceImage: SFC<Props> = ({
  type,
  color,
  outlineColor,
  size,
  opacity,
  rotatePiece,
  glowColor,
  style,
  animatedColor,
  animatedOutlineColor,
  pieceDecorationNames,
  squareShape,
}) => {
  if (size < 0) return null;
  const primary = color;
  const secondary = outlineColor ? outlineColor : Colors.DARKEST.string();
  const primaryAnimated = animatedColor;
  const secondaryAnimated = animatedOutlineColor;
  const alphaModifier = opacity === undefined ? 1 : opacity;
  const paths = (
    <>
      {PIECE_SPRITE[type]}
      {
        <PieceDecorations
          pieceDecorationNames={pieceDecorationNames}
          squareShape={squareShape}
        />
      }
    </>
  );

  const glowAlphas = [0.03, 0.1, 0.1, 0.2, 0.3, 0.4, 1];

  return (
    <Svg
      width={size}
      height={size}
      originX={rotatePiece ? 0 : 1}
      rotation={rotatePiece ? 180 : 0}
      viewBox="0 0 45 45"
      style={style}
      pointerEvents={"none"}
    >
      {glowColor &&
        glowAlphas.map((alpha, i) => (
          <G
            stroke={glowColor}
            strokeWidth={9 - Math.sqrt(9 * i)}
            strokeOpacity={alpha}
            key={i}
          >
            {paths}
          </G>
        ))}
      {animatedColor || animatedOutlineColor ? (
        <AnimatedGroup
          fill={primaryAnimated}
          stroke={secondaryAnimated}
          strokeWidth={0.9}
          opacity={alphaModifier}
        >
          {paths}
        </AnimatedGroup>
      ) : (
        <G fill={primary} stroke={secondary} strokeWidth={0.9} opacity={alphaModifier}>
          {paths}
        </G>
      )}
    </Svg>
  );
};

export { PieceImage };
