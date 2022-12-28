import React, { FC } from "react";
import { GameMaster, Square } from "game";
import { getHighlightColorsAndTypes } from "./getHighlightColorsAndTypes";
import { CircleGeometry, Euler, Quaternion, Vector3 } from "three";

interface Props {
  gameMaster: GameMaster;
  square: Square;
  position: Vector3;
  normal: Vector3;
}

export const CenterHighlights3D: FC<Props> = ({
  gameMaster,
  square,
  position,
  normal,
}) => {
  return (
    <>
      {getHighlightColorsAndTypes({ gameMaster, square })
        .filter(({ type }) => type === "center")
        .map(({ color }, index) => (
          <mesh
            geometry={new CircleGeometry(0.1, 20)}
            position={position}
            rotation={new Euler().setFromQuaternion(
              new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), normal)
            )}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial attach="material" color={color} roughness={0} />
          </mesh>
        ))}
    </>
  );
};
