export type SvgMeasurement = number;
export type PixelMeasurement = number;

export const SVG_TILE_WORKING_AREA: SvgMeasurement = 1000;

export const pixelToSvg = (
  pixelLength: PixelMeasurement,
  boardSize: PixelMeasurement
): SvgMeasurement => {
  return pixelLength * (SVG_TILE_WORKING_AREA / boardSize);
};
export const svgToPixel = (
  svgLength: SvgMeasurement,
  boardSize: PixelMeasurement
): PixelMeasurement => {
  return boardSize * (svgLength / SVG_TILE_WORKING_AREA);
};
