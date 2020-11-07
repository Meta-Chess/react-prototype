import { View } from "react-native";
import React from "react";
import { SFC } from "primitives";

export const SidebarContainer: SFC = ({ children, style }) => {
  return (
    <View style={[style, { flexDirection: "row" }]}>
      <View style={{ flex: 1, maxWidth: 60 }} />
      <View style={{ flex: 1, minWidth: 360, justifyContent: "center" }}>{children}</View>
      <View style={{ flex: 1, maxWidth: 60 }} />
    </View>
  );
};
