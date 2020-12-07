import React from "react";
import { SFC, Text, Colors } from "primitives";
import { View } from "react-native";
import { FutureVariant } from "game";
import { TraitLabel } from "./TraitLabel";
import { TraitClass } from "game/types";

interface VariantTileBodyProps {
  variant: FutureVariant;
}

const VariantTileBody: SFC<VariantTileBodyProps> = ({ variant }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: Colors.DARK.toString(),
      }}
    >
      <View style={{ marginVertical: 8 }}>
        <Text
          cat="BodyXS"
          color={Colors.TEXT.LIGHT.toString()}
          style={{ marginHorizontal: 12 }}
          numberOfLines={4}
        >
          {variant.shortDescription}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 12,
          marginVertical: 6,
        }}
      >
        {variant.TraitClass.map((trait: TraitClass, index: number) => (
          <TraitLabel
            key={index}
            trait={trait}
            style={{ marginRight: 8, marginBottom: 4 }}
          />
        ))}
      </View>
    </View>
  );
};

export { VariantTileBody };
