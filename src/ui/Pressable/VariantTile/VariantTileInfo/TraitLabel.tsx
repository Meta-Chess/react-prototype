import React from "react";
import { SFC, Text } from "primitives";
import { View } from "react-native";
import { TraitName, traitInfo } from "game/variants";
import { opacify } from "utilities";
import { Colors } from "primitives";

interface TraitLabelProps {
  trait: TraitName;
}

const TraitLabel: SFC<TraitLabelProps> = ({ trait, style }) => {
  const color = opacify(traitInfo[trait].color.toString(), 0.5);
  return (
    <View
      style={[
        style,
        {
          alignItems: "center",
          backgroundColor: color,
          borderRadius: 6,
          paddingHorizontal: 7,
          paddingVertical: 1,
        },
      ]}
    >
      <Text cat={"BodyXS"} color={Colors.TEXT.LIGHT.toString()}>
        {trait}
      </Text>
    </View>
  );
};

export { TraitLabel };
