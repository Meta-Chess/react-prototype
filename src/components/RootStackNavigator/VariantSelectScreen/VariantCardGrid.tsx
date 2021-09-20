import React from "react";
import { View, ScrollView } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { VariantTile } from "ui/Pressable/VariantTile";
import { ConflictLevel, FutureVariantName, futureVariants } from "game";
import {
  complexityLevels,
  partitionDisplayVariantsByComplexity,
} from "./partitionDisplayVariantsByComplexity";
import styled from "styled-components/native";
import { VariantModalInfo } from "./Modals";
import { RuleNamesWithParams } from "game/CompactRules";
import { doGameOptionsModifyVariant } from "game/variantAndRuleProcessing";
interface Props {
  displayVariants: FutureVariantName[];
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  conflictLevel: ConflictLevel | undefined;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  ruleNamesWithParams?: RuleNamesWithParams;
}

const VariantCardGrid: SFC<Props> = ({
  style,
  displayVariants,
  selectedVariants,
  setSelectedVariants,
  conflictLevel,
  setVariantModalInfo,
  ruleNamesWithParams = {},
}) => {
  const partitionedDisplayVariants =
    partitionDisplayVariantsByComplexity(displayVariants);
  return (
    <View style={style}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24 }}
      >
        {complexityLevels.map((catagory) => {
          return (
            <View key={catagory}>
              {partitionedDisplayVariants[catagory].length > 0 && (
                <>
                  <Text
                    cat={"DisplayM"}
                    alignment={"left"}
                    color={Colors.TEXT.LIGHT_SECONDARY.fade(0.4).toString()}
                    style={{ marginLeft: 4 }}
                  >
                    {catagory}
                  </Text>
                  <CatagorySeparator />
                  <CardContainer>
                    {partitionedDisplayVariants[catagory].map((variant, i) => {
                      return (
                        <VariantTile
                          key={variant}
                          color={Colors.DARK}
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
                          setVariantModalInfo={setVariantModalInfo}
                          modified={doGameOptionsModifyVariant(
                            futureVariants[variant],
                            ruleNamesWithParams
                          )}
                          style={{ margin: 4 }}
                        />
                      );
                    })}
                  </CardContainer>
                </>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const CardContainer = styled(View)`
  flex-flow: row wrap;
  margin: 0px 0px 20px 0px;
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
