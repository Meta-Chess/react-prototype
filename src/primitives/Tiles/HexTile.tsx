import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";

interface HexTileProps {
  size: number;
  color: string;
}

const HexTile: SFC<HexTileProps> = ({ size, color }) => {
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
      <View
        style={{
          borderTopWidth: size / 2,
          borderBottomWidth: size / 2,
          borderRightWidth: endWidth,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderRightColor: color,
        }}
      />
      <View
        style={{
          width: centerWidth,
          height: size,
          backgroundColor: color,
        }}
      />
      <View
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

export { HexTile };
