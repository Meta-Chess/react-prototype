import React from "react";
import { SFC, Text, Colors } from "primitives";
import { View } from "react-native";
import { futureVariantDetails } from "game";
import { TraitLabel } from "./TraitLabel";

interface TileBodyProps {
  variant: futureVariantDetails;
}

const TileBody: SFC<TileBodyProps> = ({ variant }) => {
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
        {variant.traitClasses.map((trait: string, index: number) => (
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

export { TileBody };
