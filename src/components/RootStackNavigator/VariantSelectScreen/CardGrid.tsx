import React from "react";
import { View, ScrollView } from "react-native";
import { SFC } from "primitives";
import { VariantTile } from "ui/Pressable/VariantTile";
import { FutureVariantName, futureVariants } from "game/variants";
import styled from "styled-components/native";
interface Props {
  displayVariants: FutureVariantName[];
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  variantClash: boolean;
}

const CardGrid: SFC<Props> = ({
  style,
  displayVariants,
  selectedVariants,
  setSelectedVariants,
  variantClash,
}) => {
  return (
    <View
      style={[
        style,
        {
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardContainer>
          {displayVariants.map((variant) => {
            return (
              <VariantTile
                key={variant}
                variant={futureVariants[variant]}
                selected={selectedVariants.some((x) => x === variant)}
                clash={variantClash}
                onPress={(): void =>
                  selectedVariants.some((x) => x === variant)
                    ? setSelectedVariants(selectedVariants.filter((x) => x !== variant))
                    : setSelectedVariants([...selectedVariants, variant])
                }
              />
            );
          })}
        </CardContainer>
      </ScrollView>
    </View>
  );
};

const CardContainer = styled(View)`
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-vertical: -1px;
`;

export { CardGrid };
