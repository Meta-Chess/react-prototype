import React from "react";
import { View, ScrollView } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { VariantTile } from "ui/Pressable/VariantTile";
import { AdviceLevel, FutureVariantName, futureVariants } from "game";
import {
  complexityLevels,
  partitionDisplayVariantsByComplexity,
} from "./partitionDisplayVariantsByComplexity";
import styled from "styled-components/native";
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
  const partitionedDisplayVariants = partitionDisplayVariantsByComplexity(
    displayVariants
  );
  return (
    <View style={style}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24 }}
      >
        {complexityLevels.map((catagory, i) => {
          return (
            <View key={catagory}>
              {partitionedDisplayVariants[catagory].length > 0 && (
                <>
                  <Text
                    cat={"DisplayM"}
                    alignment={"left"}
                    color={Colors.TEXT.LIGHT_SECONDARY.fade(0.4).toString()}
                    style={{ marginLeft: 4, marginTop: i === 0 ? 0 : 20 }}
                  >
                    {catagory}
                  </Text>
                  <CatagorySeparator />
                </>
              )}
              <CardContainer>
                {partitionedDisplayVariants[catagory].map((variant) => {
                  return (
                    <VariantTile
                      key={variant}
                      variant={futureVariants[variant]}
                      selected={selectedVariants.includes(variant)}
                      conflictLevel={conflictLevel}
                      onPress={(): void =>
                        selectedVariants.includes(variant)
                          ? setSelectedVariants(
                              selectedVariants.filter((x) => x !== variant)
                            )
                          : setSelectedVariants([...selectedVariants, variant])
                      }
                      style={{ margin: 4 }}
                    />
                  );
                })}
              </CardContainer>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const CardContainer = styled(View)`
  flex-flow: row wrap;
`;

const CatagorySeparator = styled(View)`
  flex: 1px;
  height: 2px;
  margin-right: 20px;
  margin-bottom: 16px;
  border-bottom-width: 2px;
  border-bottom-color: ${Colors.DARK.toString()};
`;

export { VariantCardGrid };
