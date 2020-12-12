import React from "react";
import { View, ScrollView } from "react-native";
import { SFC } from "primitives";
import { VariantTile } from "ui/Pressable/VariantTile";
import { FutureVariantName, futureVariants } from "game/variants/variants";
import styled from "styled-components/native";
interface Props {
  displayVariants: FutureVariantName[];
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  variantClash: boolean;
}

const VariantCardGrid: SFC<Props> = ({
  style,
  displayVariants,
  selectedVariants,
  setSelectedVariants,
  variantClash,
}) => {
  return (
    <View style={style}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardContainer>
          {displayVariants.map((variant) => {
            return (
              <VariantTile
                key={variant}
                variant={futureVariants[variant]}
                selected={selectedVariants.includes(variant)}
                clash={variantClash}
                onPress={(): void =>
                  selectedVariants.includes(variant)
                    ? setSelectedVariants(selectedVariants.filter((x) => x !== variant))
                    : setSelectedVariants([...selectedVariants, variant])
                }
                style={{ margin: 4 }}
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
  flex-direction: row;
  flex-wrap: wrap;
`;

export { VariantCardGrid };
