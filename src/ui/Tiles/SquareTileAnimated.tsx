import React, { FC } from "react";
import { Animated } from "react-native";
import { AnimatedTileProps } from "./TileProps";
import { AbsoluteView } from "ui/Containers";

const SquareTileAnimated: FC<AnimatedTileProps> = ({ size, color }) => {
  return (
    <AbsoluteView>
      <Animated.View style={{ height: size, width: size, backgroundColor: color }} />
    </AbsoluteView>
  );
};

export { SquareTileAnimated };
