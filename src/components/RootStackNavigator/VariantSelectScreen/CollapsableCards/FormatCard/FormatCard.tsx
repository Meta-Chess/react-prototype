import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { futureVariants } from "game";
import { CollapsableCard } from "ui/Containers";
import { SFC, Text, Colors } from "primitives";
import { FutureVariantName } from "game";
import { FormatName, formats } from "game/formats";

interface Props {
  selectedFormat: FormatName;
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
}

const FormatCard: SFC<Props> = ({
  selectedFormat,
  selectedVariants,
  setSelectedVariants,
}) => {
  return (
    <CollapsableCard
      title={formats[selectedFormat].title}
      TitleComponent={formats[selectedFormat].icon}
    >
      <Text
        color={Colors.TEXT.LIGHT_SECONDARY.toString()}
        cat="BodyXS"
        style={{ fontStyle: "italic", marginVertical: 6, marginLeft: 8 }}
      >
        {formats[selectedFormat].variantScreenHelpText}
      </Text>
      <Container>
        {selectedVariants.map((variant) => {
          return (
            <TouchableOpacity
              key={variant}
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
            >
              <Text cat="BodyXS">{futureVariants[variant].title}</Text>
            </TouchableOpacity>
          );
        })}
      </Container>
    </CollapsableCard>
  );
};

const Container = styled(View)`
  flex-flow: row wrap;
`;

export { FormatCard };
