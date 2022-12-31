import React, { FC } from "react";
import { GameMaster, Square } from "game";
import { getHighlightColorsAndTypes } from "./getHighlightColorsAndTypes";
import { CircleGeometry, Euler, Quaternion, Vector3 } from "three";
import { Projection } from "primitives";

interface Props {
  gameMaster: GameMaster;
  square: Square;
  coordinates: {
    rank: number;
    file: number;
    numberOfRanks: number;
    numberOfFiles: number;
  };
  projection: Projection;
}

export const CenterHighlights3D: FC<Props> = ({
  gameMaster,
  square,
  coordinates,
  projection,
}) => {
  const { position, normal } = projection({
    ...coordinates,
    rank: coordinates.rank + 0.5,
    file: coordinates.file + 0.5,
    heightAdjustment: 0.013,
  });
  return (
    <>
      {getHighlightColorsAndTypes({ gameMaster, square })
        .filter(({ type }) => type === "center")
        .map(({ color }, index) => (
          <mesh
            key={index}
            geometry={new CircleGeometry(0.1, 20)}
            position={position}
            rotation={new Euler().setFromQuaternion(
              new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), normal)
            )}
            receiveShadow
            castShadow
          >
            <meshStandardMaterial
              attach="material"
              color={color.opaquer(1).toString()}
              roughness={0}
              transparent={true}
              opacity={0.7}
            />
          </mesh>
        ))}
    </>
  );
};
