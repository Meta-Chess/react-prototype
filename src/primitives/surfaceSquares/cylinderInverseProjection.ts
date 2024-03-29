import { Vector3 } from "three";
import { InverseProjection } from "./InverseProjection";

const RADIUS = 0.5;
const LENGTH = 2;

export const cylinderInverseProjection: InverseProjection = ({
  file,
  rank,
  numberOfFiles,
  numberOfRanks,
  heightAdjustment = 0,
}) => {
  const angle = -(file * 2 * Math.PI) / numberOfFiles;

  return {
    position: new Vector3(
      -(RADIUS + heightAdjustment) * Math.cos(angle),
      LENGTH / 2 - ((rank - 1) / numberOfRanks) * LENGTH,
      (RADIUS + heightAdjustment) * Math.sin(angle)
    ),
    normal: new Vector3(-Math.cos(angle), 0, Math.sin(angle)),
  };
};
