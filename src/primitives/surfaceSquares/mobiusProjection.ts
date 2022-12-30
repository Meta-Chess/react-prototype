import { Vector3 } from "three";
import { Projection } from "./Projection";

const R = 0.8;
const STRIP_WIDTH = 0.8;
const HALF_THICKNESS = 0.03;

const [sin, cos] = [Math.sin, Math.cos];

export const mobiusProjection: Projection = ({
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
  // phi is the twist angle which goes from 0 to 2*pi. It's half the central angle
  const phi = (rank * 2 * Math.PI) / numberOfRanks;
  // u is the offset from the central circle of the mobius strip that gives the mobius strip its width
  const u = (STRIP_WIDTH * (file - 1)) / numberOfFiles - STRIP_WIDTH / 2;

  const flatPosition = new Vector3(
    (R + u * cos(phi)) * cos(2 * phi),
    (R + u * cos(phi)) * sin(2 * phi),
    u * sin(phi)
  );
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
