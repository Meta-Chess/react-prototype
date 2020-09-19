import { View } from "react-native";
import React, { FC } from "react";

interface Props {
  color: string;
}

export const Triangle: FC<Props> = ({ color }) => (
  <View
    style={[
      {
        marginLeft: -10,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderTopWidth: 0,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        borderBottomColor: color,
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        zIndex: 100,
      },
    ]}
  />
);
