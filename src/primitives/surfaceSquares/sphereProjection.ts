import { Vector3 } from "three";

export const sphereProjection: Projection = (
  x: number,
  y: number,
  xCount: number,
  yCount: number
) => {
  const vector = new Vector3().setFromSphericalCoords(
    1,
    ((y - 0.5) * Math.PI) / (yCount + 1), // the +1 is to leave room at the poles
    (x * 2 * Math.PI) / xCount
  );
  return {
    position: [vector.x, vector.y, vector.z],
    normal: [vector.x, vector.y, vector.z],
  };
};
