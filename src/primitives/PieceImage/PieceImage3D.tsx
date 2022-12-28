import React, { FC } from "react";
import { PieceName } from "game";
import { Animated } from "react-native";
import { PieceDecorationName } from "components/shared/Board/Piece/getPieceDecorationNames";
import { Euler, Quaternion, Vector3 } from "three";
import {
  bishopGeometry,
  kingGeometry,
  knightGeometry,
  pawnGeometry,
  queenGeometry,
  rookGeometry,
} from "./geometries";

interface Props {
  type: PieceName;
  color?: string | undefined;
  position: Vector3;
  size?: number;
  opacity?: number;
  animated?: boolean;
  animatedColor?: Animated.AnimatedInterpolation | undefined;
  animatedOutlineColor?: Animated.AnimatedInterpolation | undefined;
  pieceDecorationNames?: PieceDecorationName[];
}

// TODO: Implement sizes, animations, and decorations
const PieceImage3D: FC<Props> = ({ type, color, position, opacity }) => {
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
      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={0.2}
        metalness={0.5}
        transparent={opacity !== undefined}
        opacity={opacity}
      />
    </mesh>
  );
};

export { PieceImage3D };
