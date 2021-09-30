import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity } from "react-native";
import { AbsoluteView } from "ui";
import type { TilePressableProps } from "./TilePressableProps";

export const TilePressable: SFC<TilePressableProps> = ({ onPress, children }) => {
  return (
    <AbsoluteView pointerEvents={"none"}>
      <TouchableOpacity
        style={{ width: "100%", height: "100%" }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </AbsoluteView>
  );
};
