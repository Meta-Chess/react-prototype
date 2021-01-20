import React, { FC } from "react";
import { View } from "react-native";
import { Colors } from "primitives";

interface Props {
  color?: string;
}

export const HorizontalSeparator: FC<Props> = ({
  color = Colors.BLACK.fade(0.8).toString(),
}) => {
  return (
    <View style={{ width: "100%" }}>
      <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: color }} />
    </View>
  );
};
