import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";

interface HexTileProps {
  radius: number;
  color: string;
}

const HexTile: SFC<HexTileProps> = ({ radius, color }) => {
  const height = 2 * radius;
  const centerWidth = radius * (2 / Math.sqrt(3));
  const endWidth = radius / Math.sqrt(3);
  return (
    <View
      style={{
        width: centerWidth + 2 * endWidth,
        height: height,
        justifyContent: "center",
        backgroundColor: "transparent",
        flexDirection: "row",
        marginLeft: -height / (8 * Math.sqrt(3)),
        position: "absolute",
      }}
    >
      <View
        style={{
          width: 0,
          height: 0,
          borderTopWidth: height / 2,
          borderBottomWidth: height / 2,
          borderRightWidth: endWidth,
          borderStyle: "solid",
          backgroundColor: "transparent",
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderRightColor: color,
        }}
      />
      <View
        style={{
          width: centerWidth,
          height: height,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          width: 0,
          height: 0,
          borderTopWidth: height / 2,
          borderBottomWidth: height / 2,
          borderLeftWidth: endWidth,
          borderStyle: "solid",
          backgroundColor: "transparent",
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: color,
        }}
      />
    </View>
  );
};

export { HexTile };