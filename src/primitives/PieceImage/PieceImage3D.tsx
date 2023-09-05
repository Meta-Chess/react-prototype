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
  bishopKnightGeometry,
  rookKnightGeometry,
} from "./geometries";
import { InverseProjection } from "primitives";
import { ThreeEvent } from "@react-three/fiber";

interface Props {
  type: PieceName;
  color?: string | undefined;
  coordinates: {
    rank: number;
    file: number;
    numberOfRanks: number;
    numberOfFiles: number;
  };
  inverseProjection: InverseProjection;
  size?: number;
  opacity?: number;
  animated?: boolean;
  animatedColor?: Animated.AnimatedInterpolation | undefined;
  animatedOutlineColor?: Animated.AnimatedInterpolation | undefined;
  pieceDecorationNames?: PieceDecorationName[];
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
  hidden?: boolean;
}

// TODO: Implement sizes, animations, and decorations
const PieceImage3D: FC<Props> = ({
  type,
  color,
  coordinates,
  inverseProjection,
  onClick,
  opacity = 1,
}) => {
  const { position, normal } = inverseProjection({
    ...coordinates,
    ...coordinates,
    rank: coordinates.rank + 0.5,
    file: coordinates.file + 0.5,
    heightAdjustment: -0.01,
  });

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
      : type === PieceName.BishopKnight
      ? bishopKnightGeometry
      : type === PieceName.RookKnight
      ? rookKnightGeometry
      : kingGeometry;

  return (
    <mesh
      geometry={geometry}
      position={position}
      // TODO: find a way to express the rotation that gets the knights pointing forwards
      rotation={new Euler().setFromQuaternion(
        new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), normal)
      )}
      onClick={onClick}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={0.2}
        metalness={0.5}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
};

export { PieceImage3D };
