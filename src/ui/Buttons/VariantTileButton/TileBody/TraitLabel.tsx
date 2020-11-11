import React from "react";
import { SFC, Text } from "primitives";
import { View } from "react-native";
import { traitColors } from "game/types";
import { contrast } from "utilities";

interface TraitLabelProps {
  trait: string;
}

const TraitLabel: SFC<TraitLabelProps> = ({ trait, style }) => {
  const color = traitColors[trait as keyof typeof traitColors].toString();
  return (
    <View
      style={[
        style,
        {
          backgroundColor: color,
          borderRadius: 6,
          width: 12,
          height: 12,
        },
      ]}
    >
      <Text cat={"BodyXS"} color={contrast(color)}>
        {}
      </Text>
    </View>
  );
};

export { TraitLabel };
