import React from "react";
import { PieceName } from "game";
import { Svg, G } from "react-native-svg";
import { Colors } from "../Colors";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./sprites";
import { SFC } from "primitives/SFC";
import { Animated } from "react-native";
import { AnimatedGroup } from "primitives";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";
import { PieceDecorations } from "./PieceDecorations";
import { GameMaster } from "game";
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
  gameMaster?: GameMaster;
}

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
  gameMaster,
}) => {
  if (size < 0) return null;
  const primary = color;
  const secondary = outlineColor ? outlineColor : Colors.DARKEST.string();
  const primaryAnimated = animatedColor;
  const secondaryAnimated = animatedOutlineColor;
  const alphaModifier = opacity === undefined ? 1 : opacity;
  const paths = (
    <>
      {type === PieceName.Pawn ? (
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
      )}
      {
        <PieceDecorations
          pieceDecorationNames={pieceDecorationNames}
          gameMaster={gameMaster}
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
