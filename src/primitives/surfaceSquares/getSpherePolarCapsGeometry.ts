import { BufferGeometry } from "three";
import { sphereInverseProjection } from "./sphereInverseProjection";
import { getCapGeometry } from "./getCapGeometry";

export function getSpherePolarCapsGeometry(input: {
  numberOfFiles: number;
  numberOfRanks: number;
  fileGranularity: number;
}): BufferGeometry {
  return getCapGeometry({
    ...input,
    inverseProjection: sphereInverseProjection,
    rankMinusOnePoint: [0, 1, 0],
    rankMaxPlusOnePoint: [0, -1, 0],
  });
}
