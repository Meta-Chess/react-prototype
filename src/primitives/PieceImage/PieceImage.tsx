import React, { FC } from "react";
import { PieceType } from "domain/Game/types";
import { Svg, G } from "react-native-svg";
import { Colors } from "primitives";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./sprites";

interface Props {
  type: PieceType;
  color: string;
  size: number;
  glowColor?: string;
}

const PieceImage: FC<Props> = ({ type, color, size, glowColor }) => {
  const primary = color;
  const secondary = Colors.DARKEST.string();
  const paths =
    type === PieceType.Pawn ? (
      <Pawn />
    ) : type === PieceType.Bishop ? (
      <Bishop />
    ) : type === PieceType.Knight ? (
      <Knight />
    ) : type === PieceType.Rook ? (
      <Rook />
    ) : type === PieceType.Queen ? (
      <Queen />
    ) : (
      <King />
    );

  const glowAlphas = [0.03, 0.1, 0.1, 0.2, 0.3, 0.4, 1, 1];
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45">
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
      <G fill={primary} stroke={secondary} strokeWidth={0.9}>
        {paths}
      </G>
    </Svg>
  );
};

export { PieceImage };
