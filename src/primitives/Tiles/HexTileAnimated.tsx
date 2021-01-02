import React from "react";
import { SFC } from "primitives";
import { View, Animated } from "react-native";

interface HexTileAnimatedProps {
  size: number;
  color: Animated.AnimatedInterpolation;
}

const HexTileAnimated: SFC<HexTileAnimatedProps> = ({ size, color }) => {
  const radius = size / 2;
  const centerWidth = radius * (2 / Math.sqrt(3));
  const endWidth = radius / Math.sqrt(3);
  return (
    <View
      style={{
        flexDirection: "row",
        marginLeft: -size / (8 * Math.sqrt(3)),
        position: "absolute",
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
    </View>
  );
};

export { HexTileAnimated };
