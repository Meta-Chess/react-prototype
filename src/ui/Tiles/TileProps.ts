import { Animated } from "react-native";

interface CoreTileProps {
  size?: number;
  tileSchematic?: TileSchematic;
  pressable?: boolean;
}

export type TileProps = { color: string } & CoreTileProps;
export type AnimatedTileProps = {
  color: Animated.AnimatedInterpolation;
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
