import React from "react";
import { SFC, Text, Colors } from "primitives";
import { View } from "react-native";
import { FutureVariant } from "game";
import { TraitLabel } from "./TraitLabel";
import { TraitClass } from "game/types";

interface VariantTileInfoProps {
  variant: FutureVariant;
}

const VariantTileInfo: SFC<VariantTileInfoProps> = ({ style, variant }) => {
  return (
    <View
      style={[
        style,
        {
          justifyContent: "space-between",
          backgroundColor: Colors.DARK.toString(),
        },
      ]}
    >
      <View>
        <Text cat="BodyXS" color={Colors.TEXT.LIGHT.toString()} numberOfLines={4}>
          {variant.shortDescription}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 2,
        }}
      >
        {variant.TraitClass.map((trait: TraitClass, index: number) => (
          <TraitLabel key={index} trait={trait} style={{ marginRight: 8 }} />
        ))}
      </View>
    </View>
  );
};

export { VariantTileInfo };
