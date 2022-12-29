const CENTRAL_RADIUS = 0.8;
const TUBE_RADIUS = 0.4;

export const torusProjection: Projection = (
  x: number,
  y: number,
  xCount: number,
  yCount: number
) => {
  const centralAngle = (y * 2 * Math.PI) / yCount;
  const tubeAngle = (x * 2 * Math.PI) / xCount;

  return {
    position: [
      (CENTRAL_RADIUS + TUBE_RADIUS * Math.cos(tubeAngle)) * Math.cos(centralAngle),
      (CENTRAL_RADIUS + TUBE_RADIUS * Math.cos(tubeAngle)) * Math.sin(centralAngle),
      TUBE_RADIUS * Math.sin(tubeAngle),
    ],
    normal: [
      Math.cos(centralAngle) * Math.cos(tubeAngle),
      Math.sin(centralAngle) * Math.cos(tubeAngle),
      Math.sin(tubeAngle),
    ],
  };
};
