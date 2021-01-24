import React from "react";
import { PieceName } from "game";
import { Svg, G } from "react-native-svg";
import { Colors } from "../Colors";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./sprites";
import { SFC } from "primitives/SFC";
import { Animated } from "react-native";

interface Props {
  type: PieceName;
  color?: string | undefined;
  size: number;
  opacity?: number;
  rotatePiece?: boolean;
  glowColor?: string;
  animated?: boolean;
  animatedColor?: Animated.AnimatedInterpolation | undefined;
  animatedOutlineColor?: Animated.AnimatedInterpolation | undefined;
}

const PieceImage: SFC<Props> = ({
  type,
  color,
  size,
  opacity,
  rotatePiece,
  glowColor,
  style,
  animated = false,
  animatedColor,
  animatedOutlineColor,
}) => {
  if (size < 0) return null;
  const primary = color;
  const secondary = Colors.DARKEST.string();
  const primaryAnimated = animated ? animatedColor : undefined;
  const secondaryAnimated = animated ? animatedOutlineColor : undefined;
  const alphaModifier = opacity === undefined ? 1 : opacity;
  const paths =
    type === PieceName.Pawn ? (
      <Pawn />
    ) : type === PieceName.Bishop ? (
      <Bishop />
    ) : type === PieceName.Knight ? (
      <Knight />
    ) : type === PieceName.Rook ? (
      <Rook />
    ) : type === PieceName.Queen ? (
      <Queen />
    ) : (
      <King />
    );

  const glowAlphas = [0.03, 0.1, 0.1, 0.2, 0.3, 0.4, 1];
  const AnimatedG = Animated.createAnimatedComponent(G);

  return (
    <Svg
      width={size}
      height={size}
      originX={rotatePiece ? 0 : 1}
      rotation={rotatePiece ? 180 : 0}
      viewBox="0 0 45 45"
      style={style}
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
      {animated ? (
        <AnimatedG
          fill={primaryAnimated}
          stroke={secondaryAnimated}
          strokeWidth={0.9}
          opacity={alphaModifier}
        >
          {paths}
        </AnimatedG>
      ) : (
        <G fill={primary} stroke={secondary} strokeWidth={0.9} opacity={alphaModifier}>
          {paths}
        </G>
      )}
    </Svg>
  );
};

export { PieceImage };
