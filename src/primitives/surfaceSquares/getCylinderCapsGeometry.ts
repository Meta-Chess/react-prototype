import { BufferGeometry } from "three";
import { cylinderProjection } from "./cylinderProjection";
import { getCapGeometry } from "./getCapGeometry";

export function getCylinderCapsGeometry(input: {
  numberOfFiles: number;
  numberOfRanks: number;
  fileGranularity: number;
}): BufferGeometry {
  return getCapGeometry({
    ...input,
    projection: cylinderProjection,
    rankMinusOnePoint: [0, 1, 0],
    rankMaxPlusOnePoint: [0, -1, 0],
  });
}
