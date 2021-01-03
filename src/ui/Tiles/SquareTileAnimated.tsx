import React, { FC } from "react";
import { Animated } from "react-native";
import { AnimatedTileProps } from "./TileProps";

const SquareTileAnimated: FC<AnimatedTileProps> = ({ size, color }) => {
  return <Animated.View style={{ height: size, width: size, backgroundColor: color }} />;
};

export { SquareTileAnimated };
