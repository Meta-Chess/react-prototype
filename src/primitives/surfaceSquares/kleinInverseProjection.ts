import { Vector3 } from "three";
import { InverseProjection } from "./InverseProjection";

const CENTRAL_RADIUS = 0.8;
const TUBE_RADIUS = 0.4;

const [sin, cos] = [Math.sin, Math.cos];

type InverseProjectionParameters = Parameters<InverseProjection>[0];

export const kleinInverseProjection: InverseProjection = ({
  file,
  rank,
  heightAdjustment = 0,
  ...rest
}: InverseProjectionParameters) => {
  rank = rank + 0.5;
  const position = kleinPosition({ rank, file, ...rest });
  const fileDirection = kleinPosition({ rank, file: file - 0.01, ...rest }).sub(
    kleinPosition({ rank, file: file + 0.01, ...rest })
  );
  const rankDirection = kleinPosition({ rank: rank - 0.01, file, ...rest }).sub(
    kleinPosition({ rank: rank + 0.01, file, ...rest })
  );
  const normal = fileDirection.cross(rankDirection).setLength(1);

  return {
    position: position.add(normal.clone().setLength(0.03 + heightAdjustment)),
    normal,
  };
};

function kleinPosition({
  rank,
  file,
  numberOfRanks,
  numberOfFiles,
}: Omit<InverseProjectionParameters, "heightAdjustment">): Vector3 {
  const centralAngle = (2 * (rank * 2 * Math.PI)) / numberOfRanks;
  const tubeAngle = -(file * 2 * Math.PI) / numberOfFiles;
  const twistAngle = centralAngle / 2;
  const effectiveTubeRadius = TUBE_RADIUS;
  return new Vector3(
    CENTRAL_RADIUS * cos(centralAngle) +
      effectiveTubeRadius * cos(tubeAngle) * cos(centralAngle - twistAngle),
    CENTRAL_RADIUS * sin(centralAngle) +
      effectiveTubeRadius * cos(tubeAngle) * sin(centralAngle - twistAngle),
    TUBE_RADIUS * sin(tubeAngle)
  );
}
