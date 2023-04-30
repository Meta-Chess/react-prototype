import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { futureVariants } from "game";
import { CollapsableCard } from "ui/Containers";
import { SFC, Text, Colors } from "primitives";
import { FutureVariantName } from "game";
import { FormatName, formats } from "game/formats";
import { RuleNamesWithParams } from "game/CompactRules";
import { VariantLabel } from "components/shared/Labels";

interface Props {
  selectedFormat: FormatName;
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  ruleNamesWithParams?: RuleNamesWithParams;
}

const VariantSelectCard: SFC<Props> = ({
  selectedFormat,
  selectedVariants,
  setSelectedVariants,
  ruleNamesWithParams = {},
}) => {
  return (
    <CollapsableCard
      title={selectedFormat === "variantComposition" ? "Selected Variants" : "Deck"}
    >
      <Text
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        cat="BodyXS"
        style={{ fontStyle: "italic", marginVertical: 6, marginLeft: 8 }}
      >
        {formats[selectedFormat].shortExplanation}
      </Text>
      <Container>
        {selectedVariants.map((variant) => {
          return (
            <VariantLabel
              key={futureVariants[variant].title}
              variant={futureVariants[variant]}
              ruleNamesWithParams={ruleNamesWithParams}
              textCat={"BodyXS"}
              onPress={(): void =>
                selectedVariants.includes(variant)
                  ? setSelectedVariants(selectedVariants.filter((x) => x !== variant))
                  : setSelectedVariants([...selectedVariants, variant])
              }
              style={{
                paddingHorizontal: 4,
                paddingVertical: 2,
                backgroundColor: Colors.DARKISH.toString(),
                borderRadius: 4,
                margin: 4,
              }}
            />
          );
        })}
      </Container>
    </CollapsableCard>
  );
};

const Container = styled(View)`
  flex-flow: row wrap;
`;

export { VariantSelectCard };
