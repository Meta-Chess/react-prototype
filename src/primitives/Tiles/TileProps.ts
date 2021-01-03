import { Animated } from "react-native";

export interface TileProps {
  size: number;
  color: string;
}

export interface AnimatedTileProps {
  size: number;
  color: Animated.AnimatedInterpolation;
}
