import { Vector3 } from "three";
import { InverseProjection } from "./InverseProjection";

const GOAL_RADIUS = 0.8;
const SQUARE_WIDTH = 0.21;
const HALF_THICKNESS = 0.03;

const [sin, cos] = [Math.sin, Math.cos];

export const mobiusInverseProjection: InverseProjection = ({
  file,
  rank,
  numberOfFiles,
  numberOfRanks,
  heightAdjustment = 0,
}) => {
  // phi is the twist angle which goes from 0 to 2*pi. It's half the central angle
  const phi = (rank * 2 * Math.PI) / numberOfRanks;

  // u is the offset from the central circle of the mobius strip that gives the mobius strip its width
  const stripWidth = numberOfFiles * SQUARE_WIDTH;
  const u = stripWidth / 2 - (stripWidth * (file - 1)) / numberOfFiles;

  const R = Math.max(GOAL_RADIUS, stripWidth / 1.5);

  const flatPosition = new Vector3(
    (R + u * cos(phi)) * cos(2 * phi),
    (R + u * cos(phi)) * sin(2 * phi),
    u * sin(phi)
  );

  // Cross product of partial derivatives of flatPosition function
  const normal = new Vector3(
    -2 * sin(phi) * (u * sin(phi) * sin(2 * phi) - R * cos(2 * phi)),
    2 * R * sin(phi) * sin(2 * phi) + u * (cos(2 * phi) + sin(2 * phi) * sin(2 * phi)),
    -2 * cos(phi) * (R + u * cos(phi))
  ).setLength(1);

  return {
    position: flatPosition.add(
      normal.clone().multiplyScalar(HALF_THICKNESS + heightAdjustment)
    ),
    normal,
  };
};

export function mobiusEdgeNormal({
  rank,
  numberOfRanks,
}: {
  rank: number;
  numberOfRanks: number;
}): Vector3 {
  // phi is the twist angle which goes from 0 to 2*pi. It's half the central angle
  const phi = (rank * 2 * Math.PI) / numberOfRanks;
  return new Vector3(cos(phi) * cos(2 * phi), cos(phi) * sin(2 * phi), sin(phi));
}
