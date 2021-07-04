import React from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { Footer } from "ui";

interface Props {
  bottomFooter?: boolean;
}

export const ItemContainer: SFC<Props> = ({ bottomFooter = false, children, style }) => {
  return (
    <View>
      <View style={[style, { padding: 12 }]}>{children}</View>
      {bottomFooter && <Footer style={{ paddingBottom: 0 }} />}
    </View>
  );
};
