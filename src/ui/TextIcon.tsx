import React, { FC } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
// this component wraps icons to format them in alignment with text
// TODO: add textSize as a prop, defaulting to BodyM
interface Props {
  Icon: FC<{ size?: number; color?: string }>;
  color: string;
}

export const TextIcon: SFC<Props> = ({ Icon, color, style }) => {
  return (
    <View style={[style, { marginBottom: -1 }]}>
      <Icon size={14} color={color} />
    </View>
  );
};
