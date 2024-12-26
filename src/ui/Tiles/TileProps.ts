import Color from "color";
import { ReactNode } from "react";
import { Animated } from "react-native";

interface CoreTileProps {
  size?: number;
  tileSchematic?: TileSchematic;
  pressable?: boolean;
  children?: ReactNode;
}

export type TileProps = { color: Color } & CoreTileProps;
export type AnimatedTileProps = {
  color: Animated.AnimatedInterpolation<number>;
} & CoreTileProps;

export type TileSchematic = {
  topAdjustmentToTileCenter: number;
  leftAdjustmentToTileCenter: number;
  centerMaxEmbeddedDiameter: number;
} & ArcTileSchematic; // extend with ... | OtherTileSchematic ...

export interface ArcTileSchematic {
  arcSvgDetails: ArcSvgDetails;
}

interface ArcSvgDetails {
  tilePath: string;
  tileWidth: number;
}
