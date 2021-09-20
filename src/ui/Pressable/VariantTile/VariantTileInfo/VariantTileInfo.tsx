import React from "react";
import { SFC, Text, Colors } from "primitives";
import { View } from "react-native";
import { FutureVariant } from "game";
import styled from "styled-components/native";
import { TraitName, traitInfo } from "game/variants/traitInfo";
import { LabelWithDetails } from "ui";
import { VariantTileGraph } from "./VariantTileGraph";

interface VariantTileInfoProps {
  variant: FutureVariant;
}

const VariantTileInfo: SFC<VariantTileInfoProps> = ({ style, variant }) => {
  return (
    <Container style={style}>
      <View>
        <Text cat="BodyXS" color={Colors.TEXT.LIGHT.toString()} numberOfLines={4}>
          {variant.shortDescription}
        </Text>
      </View>
      <VariantTileGraph variant={variant} />
    </Container>
  );
};

const Container = styled(View)`
  justify-content: space-between;
  padding-horizontal: 12px;
  padding-vertical: 8px;
`;

export { VariantTileInfo };
