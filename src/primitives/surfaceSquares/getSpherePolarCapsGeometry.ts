import { BufferGeometry } from "three";
import { sphereProjection } from "./sphereProjection";
import { getCapGeometry } from "./getCapGeometry";

export function getSpherePolarCapsGeometry(input: {
  numberOfFiles: number;
  numberOfRanks: number;
  fileGranularity: number;
}): BufferGeometry {
  return getCapGeometry({
    ...input,
    projection: sphereProjection,
    rankMinusOnePoint: [0, 1, 0],
    rankMaxPlusOnePoint: [0, -1, 0],
  });
}