import React from "react";
import { SFC } from "primitives";
import { View } from "react-native";
import { Colors } from "primitives";

interface CoverMessyShadowProps {
  filterBarHeight: number;
  filterBarWidth: number;
}

const CoverMessyShadow: SFC<CoverMessyShadowProps> = ({
  filterBarHeight,
  filterBarWidth,
}) => {
  return (
    <View
      style={{
        height: 5,
        width: filterBarWidth - 10,
        marginBottom: filterBarHeight - 5,
        backgroundColor: Colors.DARKER.toString(),
        position: "absolute",
      }}
    />
  );
};

export { CoverMessyShadow };
