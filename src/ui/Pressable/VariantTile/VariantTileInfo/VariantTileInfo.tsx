import React from "react";
import { SFC, Text, Colors } from "primitives";
import { ViewStyle } from "react-native";
import { FutureVariant } from "game";

interface VariantTileInfoProps {
  variant: FutureVariant;
}

const defaultStyle: ViewStyle = {
  alignSelf: "flex-start",
  padding: 8,
};

const VariantTileInfo: SFC<VariantTileInfoProps> = ({ style, variant }) => {
  return (
    <Text
      style={{ ...defaultStyle, ...style }}
      cat="BodyXS"
      color={Colors.TEXT.LIGHT.toString()}
      numberOfLines={4}
    >
      {variant.shortDescription}
    </Text>
  );
};

export { VariantTileInfo };
