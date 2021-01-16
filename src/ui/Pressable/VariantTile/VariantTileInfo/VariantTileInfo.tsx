import React from "react";
import { SFC, Text, Colors } from "primitives";
import { View } from "react-native";
import { FutureVariant, TraitName } from "game";
import { TraitLabel } from "./TraitLabel";
import styled from "styled-components/native";

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
      <View style={{ flexDirection: "row", marginBottom: 2 }}>
        {variant.traits.map((trait: TraitName, index: number) => (
          <TraitLabel key={index} trait={trait} style={{ marginRight: 8 }} />
        ))}
      </View>
    </Container>
  );
};

const Container = styled(View)`
  justify-content: space-between;
  background-color: ${Colors.DARK.toString()};
  padding-horizontal: 12px;
  padding-vertical: 8px;
`;

export { VariantTileInfo };
