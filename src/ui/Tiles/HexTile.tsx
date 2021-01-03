import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";
import { TileProps } from "./TileProps";
import { AbsoluteView } from "ui/Containers";

const HexTile: SFC<TileProps> = ({ size, color }) => {
  const radius = size / 2;
  const centerWidth = radius * (2 / Math.sqrt(3));
  const endWidth = radius / Math.sqrt(3);
  return (
    <AbsoluteView
      style={{
        flexDirection: "row",
        marginLeft: -size / (8 * Math.sqrt(3)),
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
    </AbsoluteView>
  );
};

export { HexTile };
