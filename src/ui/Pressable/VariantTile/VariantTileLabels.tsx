import React from "react";
import { SFC, Text, Colors } from "primitives";
import { View } from "react-native";
import { FutureVariant } from "game";
import styled from "styled-components/native";
import { TraitName, traitInfo } from "game/variants/traitInfo";
import { LabelWithDetails } from "ui";

interface VariantTileLabelsProps {
  variant: FutureVariant;
}

const VariantTileLabels: SFC<VariantTileLabelsProps> = ({ style, variant }) => {
  return (
    <Container style={style}>
      <View style={{ flexDirection: "row" }}>
        {variant.traits.map((trait: TraitName, index: number) => (
          <LabelWithDetails
            key={index}
            label={trait}
            details={traitInfo[trait].description}
            color={traitInfo[trait].color}
            style={{ margin: 4 }}
            textCat={"BodyXS"}
          />
        ))}
      </View>
    </Container>
  );
};

const Container = styled(View)`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export { VariantTileLabels };
