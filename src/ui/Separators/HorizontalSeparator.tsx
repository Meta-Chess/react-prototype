import React, { FC } from "react";
import { View } from "react-native";
import { Colors } from "primitives";

interface Props {
  color?: string;
}

export const HorizontalSeparator: FC<Props> = ({ color = Colors.BLACK.toString() }) => {
  return (
    <View style={{ width: "100%", paddingHorizontal: 60, paddingVertical: 60 }}>
      <View style={{ flex: 1, borderTopWidth: 2, borderTopColor: color }} />
    </View>
  );
};
