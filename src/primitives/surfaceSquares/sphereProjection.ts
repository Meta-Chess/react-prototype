import { Vector3 } from "three";

export const sphereProjection: Projection = ({
  file,
  rank,
  numberOfFiles,
  numberOfRanks,
  heightAdjustment = 0,
}: {
  file: number;
  rank: number;
  numberOfFiles: number;
  numberOfRanks: number;
  heightAdjustment?: number;
}) => {
  const vector = new Vector3().setFromSphericalCoords(
    1 + heightAdjustment,
    ((rank - 0.5) * Math.PI) / (numberOfRanks + 1), // the +1 is to leave room at the poles
    (file * 2 * Math.PI) / numberOfFiles
  );
  return {
    position: [vector.x, vector.y, vector.z],
    normal: [vector.x, vector.y, vector.z],
  };
};
