import React from "react";
import { SFC, Text, Colors } from "primitives";
import { View, ViewStyle } from "react-native";
import { FutureVariant } from "game";
import styled from "styled-components/native";
import { TraitName, traitInfo } from "game/variants/traitInfo";
import { LabelWithDetails } from "ui";
import { VariantTileGraph } from "../VariantTileGraph";

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
