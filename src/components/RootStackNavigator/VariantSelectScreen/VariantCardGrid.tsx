import React from "react";
import { View, ScrollView } from "react-native";
import { SFC } from "primitives";
import { VariantTile } from "ui/Pressable/VariantTile";
import { AdviceLevel, FutureVariantName, futureVariants } from "game";
import styled from "styled-components/native";
import { HelpMenu } from "components/shared";
interface Props {
  displayVariants: FutureVariantName[];
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  conflictLevel: AdviceLevel | undefined;
}

const VariantCardGrid: SFC<Props> = ({
  style,
  displayVariants,
  selectedVariants,
  setSelectedVariants,
  conflictLevel,
}) => {
  return (
    <View style={style}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24 }}
      >
        <CardContainer>
          {displayVariants.map((variant) => {
            return (
              <VariantTile
                key={variant}
                variant={futureVariants[variant]}
                selected={selectedVariants.includes(variant)}
                conflictLevel={conflictLevel}
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
      <HelpMenu context={{ selectedVariants, displayVariants, conflictLevel }} />
    </View>
  );
};

const CardContainer = styled(View)`
  flex-flow: row wrap;
`;

export { VariantCardGrid };
