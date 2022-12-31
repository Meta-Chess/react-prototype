import { Vector3 } from "three";
import { Projection } from "./Projection";

export const sphereProjection: Projection = ({
  file,
  rank,
  numberOfFiles,
  numberOfRanks,
  heightAdjustment = 0,
}) => {
  const position = new Vector3().setFromSphericalCoords(
    1 + heightAdjustment,
    ((rank - 0.5) * Math.PI) / (numberOfRanks + 1), // the +1 is to leave room at the poles
    (file * 2 * Math.PI) / numberOfFiles
  );

  return {
    position,
    normal: position.clone().setLength(1), // Sphere's are nice like this
  };
};
