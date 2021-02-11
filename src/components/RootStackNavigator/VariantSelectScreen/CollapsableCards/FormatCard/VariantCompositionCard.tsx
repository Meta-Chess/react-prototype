import React from "react";
import { SFC } from "primitives";
import { TouchableOpacity, View } from "react-native";
import { Text, Colors } from "primitives";
import styled from "styled-components/native";
import { futureVariants } from "game";
import { CollapsableCard } from "ui/Containers";
import { CurrentCardProps } from "./CurrentCardProps";
import { VariantCompositionIcon } from "primitives/icons/Formats";

const VariantCompositionCard: SFC<CurrentCardProps> = ({
  selectedVariants,
  setSelectedVariants,
  style,
}) => {
  return (
    <CollapsableCard
      title={"Variant Composition"}
      TitleComponent={VariantCompositionIcon}
      style={style}
    >
      {selectedVariants.length !== 0 ? (
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
      ) : (
        <Text
          color={Colors.TEXT.LIGHT_SECONDARY.toString()}
          cat="BodyXS"
          style={{ fontStyle: "italic", marginVertical: 6, marginLeft: 8 }}
        >
          {"No variant selected"}
        </Text>
      )}
    </CollapsableCard>
  );
};

const Container = styled(View)`
  flex-flow: row wrap;
`;

export { VariantCompositionCard };
