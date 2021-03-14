import React, { FC } from "react";
import { Colors, Text } from "primitives";
import { View } from "react-native";

interface Props {
  title: string;
  subtitle?: string;
}

export const CardTitle: FC<Props> = ({ title, subtitle }) => {
  return (
    <View style={{ paddingTop: 8, paddingHorizontal: 12, paddingBottom: 12 }}>
      <Text cat={"DisplayS"}>{title}</Text>
      {subtitle && (
        <Text
          cat={"BodyXS"}
          color={Colors.TEXT.LIGHT_SECONDARY.toString()}
          style={{ marginTop: 2 }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};
