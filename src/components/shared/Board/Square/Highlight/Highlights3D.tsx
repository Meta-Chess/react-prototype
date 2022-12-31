import React, { FC } from "react";
import { GameMaster, Square } from "game";
import { getHighlightColorsAndTypes } from "./getHighlightColorsAndTypes";
import { CircleGeometry, Euler, Quaternion, Vector3 } from "three";
import { getSurfaceSquareGeometry, InverseProjection } from "primitives";
import { BoardMaterial } from "components/shared/Board/Square/BoardMaterial";

interface Props {
  gameMaster: GameMaster;
  square: Square;
  coordinates: {
    rank: number;
    file: number;
    numberOfRanks: number;
    numberOfFiles: number;
  };
  inverseProjection: InverseProjection;
}

export const Highlights3D: FC<Props> = ({
  gameMaster,
  square,
  coordinates,
  inverseProjection,
}) => {
  const { position, normal } = inverseProjection({
    ...coordinates,
    rank: coordinates.rank + 0.5,
    file: coordinates.file + 0.5,
    heightAdjustment: 0.013,
  });
  return (
    <>
      {getHighlightColorsAndTypes({ gameMaster, square }).map(({ type, color }, index) =>
        type === "tile" ? (
          <mesh
            key={index}
            geometry={getSurfaceSquareGeometry({
              inverseProjection,
              ...coordinates,
              rankGranularity: 64,
              fileGranularity: 64,
            })}
            receiveShadow
          >
            <BoardMaterial color={color} />
          </mesh>
        ) : (
          <mesh
            key={index}
            geometry={new CircleGeometry(0.1, 20)}
            position={position}
            rotation={new Euler().setFromQuaternion(
              new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), normal)
            )}
            receiveShadow
          >
            <BoardMaterial color={color} />
          </mesh>
        )
      )}
    </>
  );
};
