import React, { FC } from "react";
import { PieceName } from "game";
import { Animated } from "react-native";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";
import { Euler, Quaternion, Vector3 } from "three";
import { pawnGeometry } from "primitives/PieceImage/geometries/pawnGeometry";
import { bishopGeometry } from "primitives/PieceImage/geometries/bishopGeometry";
import { knightGeometry } from "primitives/PieceImage/geometries/knightGeometry";
import { rookGeometry } from "primitives/PieceImage/geometries/rookGeometry";
import { queenGeometry } from "primitives/PieceImage/geometries/queenGeometry";
import { kingGeometry } from "primitives/PieceImage/geometries/kingGeometry";

interface Props {
  type: PieceName;
  color?: string | undefined;
  position: Vector3;
  outlineColor?: string | undefined;
  size: number;
  opacity?: number;
  glowColor?: string;
  animated?: boolean;
  animatedColor?: Animated.AnimatedInterpolation | undefined;
  animatedOutlineColor?: Animated.AnimatedInterpolation | undefined;
  pieceDecorationNames?: PieceDecorationName[];
}

const PieceImage3D: FC<Props> = ({
  type,
  color,
  position,
  outlineColor, // TODO
  size, // TODO
  opacity,
  glowColor, // TODO
  animatedColor, // TODO
  animatedOutlineColor, // TODO
  pieceDecorationNames, // TODO
}) => {
  if (size < 0) return null;
  const primary = color;
  const alphaModifier = opacity === undefined ? 1 : opacity;
  const geometry =
    type === PieceName.Pawn
      ? pawnGeometry
      : type === PieceName.Bishop
      ? bishopGeometry
      : type === PieceName.Knight
      ? knightGeometry
      : type === PieceName.Rook
      ? rookGeometry
      : type === PieceName.Queen
      ? queenGeometry
      : kingGeometry;

  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={new Euler().setFromQuaternion(
        new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), position)
      )}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial attach="material" color={primary} roughness={0} />
    </mesh>
  );
};

export { PieceImage3D };
