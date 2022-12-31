import { BufferGeometry } from "three";
import { cylinderInverseProjection } from "./cylinderInverseProjection";
import { getCapGeometry } from "./getCapGeometry";

export function getCylinderCapsGeometry(input: {
  numberOfFiles: number;
  numberOfRanks: number;
  fileGranularity: number;
}): BufferGeometry {
  return getCapGeometry({
    ...input,
    inverseProjection: cylinderInverseProjection,
    rankMinusOnePoint: [0, 1, 0],
    rankMaxPlusOnePoint: [0, -1, 0],
  });
}
