import React from "react";
import { SFC, Text } from "primitives";
import { View } from "react-native";
import { TraitClass, traitInfo } from "game/types";
import { contrast } from "utilities";

interface TraitLabelProps {
  trait: TraitClass;
}

const TraitLabel: SFC<TraitLabelProps> = ({ trait, style }) => {
  const color = traitInfo[trait].color.toString();
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
