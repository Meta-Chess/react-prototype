import { View } from "react-native";
import React, { FC } from "react";

export const SidebarContainer: FC = ({ children }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row", minWidth: 380 }}>
      <View style={{ flex: 1, maxWidth: 60 }} />
      <View style={{ flex: 1, minWidth: 360, justifyContent: "center" }}>{children}</View>
      <View style={{ flex: 1, maxWidth: 60 }} />
    </View>
  );
};
