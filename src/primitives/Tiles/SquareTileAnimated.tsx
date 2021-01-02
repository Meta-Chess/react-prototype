import React from "react";
import { SFC } from "primitives";
import { Animated } from "react-native";

interface SquareTileAnimatedProps {
  size: number;
  color: Animated.AnimatedInterpolation;
}

const SquareTileAnimated: SFC<SquareTileAnimatedProps> = ({ size, color }) => {
  return <Animated.View style={{ height: size, width: size, backgroundColor: color }} />;
};

export { SquareTileAnimated };
