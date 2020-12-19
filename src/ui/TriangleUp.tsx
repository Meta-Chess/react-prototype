import { View } from "react-native";
import React, { FC } from "react";

interface Props {
  color: string;
  width: number;
  height: number;
}

export const TriangleUp: FC<Props> = ({ color, width, height }) => (
  <View
    style={[
      {
        marginLeft: -width / 2,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderTopWidth: 0,
        borderRightWidth: width / 2,
        borderBottomWidth: height,
        borderLeftWidth: width / 2,
        borderBottomColor: color,
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        zIndex: 100,
      },
    ]}
  />
);
