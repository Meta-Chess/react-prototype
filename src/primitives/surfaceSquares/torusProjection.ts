import { Vector3 } from "three";
import { Projection } from "./Projection";

const CENTRAL_RADIUS = 0.8;
const TUBE_RADIUS = 0.4;

export const torusProjection: Projection = ({
  file,
  rank,
  numberOfFiles,
  numberOfRanks,
  heightAdjustment = 0,
}) => {
  const centralAngle = (rank * 2 * Math.PI) / numberOfRanks;
  const tubeAngle = (file * 2 * Math.PI) / numberOfFiles;

  return {
    position: new Vector3(
      (CENTRAL_RADIUS + (TUBE_RADIUS + heightAdjustment) * Math.cos(tubeAngle)) *
        Math.cos(centralAngle),
      (CENTRAL_RADIUS + (TUBE_RADIUS + heightAdjustment) * Math.cos(tubeAngle)) *
        Math.sin(centralAngle),
      TUBE_RADIUS * Math.sin(tubeAngle)
    ),
    normal: new Vector3(
      Math.cos(centralAngle) * Math.cos(tubeAngle),
      Math.sin(centralAngle) * Math.cos(tubeAngle),
      Math.sin(tubeAngle)
    ),
  };
};
