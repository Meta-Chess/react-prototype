import React, { FC } from "react";
import { View } from "react-native";
import { Colors } from "primitives";

interface Props {
  color?: string;
}

export const VerticalSeparator: FC<Props> = ({ color = "#161616" }) => {
  return (
    <View style={{ height: "100%", paddingVertical: "10%" }}>
      <View style={{ flex: 1, borderRightWidth: 2, borderRightColor: color }} />
    </View>
  );
};
