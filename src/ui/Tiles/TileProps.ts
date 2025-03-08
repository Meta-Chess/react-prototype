import Color from "color";
import { Animated } from "react-native";
import type { PixelMeasurement, SvgMeasurement } from "./SvgTileUtilities";

interface CoreTileProps {
  size?: number;
  tileSchematic?: TileSchematic;
  pressable?: boolean;
}

export type TileProps = { color: Color } & CoreTileProps;
export type AnimatedTileProps = {
  color: Animated.AnimatedInterpolation;
} & CoreTileProps;

export type TileSchematic = {
  topAdjustmentToTileCenter: PixelMeasurement;
  leftAdjustmentToTileCenter: PixelMeasurement;
  centerMaxEmbeddedDiameter: PixelMeasurement;
  tilePath: string;
  scale?: number;
  arcTileWidth?: number;
  topAdjustmentToTileCenterSvg?: SvgMeasurement;
  leftAdjustmentToTileCenterSvg?: SvgMeasurement;
};
