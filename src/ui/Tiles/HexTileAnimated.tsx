import React, { FC } from "react";
import { Animated } from "react-native";
import { AnimatedTileProps } from "./TileProps";
import { AbsoluteView } from "ui/Containers";

const HexTileAnimated: FC<AnimatedTileProps> = ({ size, color }) => {
  const radius = size / 2;
  const centerWidth = radius * (2 / Math.sqrt(3));
  const endWidth = radius / Math.sqrt(3);
  return (
    <AbsoluteView
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: -size / (8 * Math.sqrt(3)),
      }}
    >
      <Animated.View
        style={{
          borderTopWidth: size / 2,
          borderBottomWidth: size / 2,
          borderRightWidth: endWidth,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderRightColor: color,
        }}
      />
      <Animated.View
        style={{
          width: centerWidth,
          height: size,
          backgroundColor: color,
        }}
      />
      <Animated.View
        style={{
          borderTopWidth: size / 2,
          borderBottomWidth: size / 2,
          borderLeftWidth: endWidth,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: color,
        }}
      />
    </AbsoluteView>
  );
};

export { HexTileAnimated };
