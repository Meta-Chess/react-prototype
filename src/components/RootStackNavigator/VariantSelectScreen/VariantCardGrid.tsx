import React from "react";
import { View, ScrollView } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { VariantTile, VariantTileTest } from "ui/Pressable/VariantTile";
import { AdviceLevel, FutureVariantName, futureVariants } from "game";
import {
  complexityLevels,
  partitionDisplayVariantsByComplexity,
} from "./partitionDisplayVariantsByComplexity";
import styled from "styled-components/native";
import { VariantModalInfo } from "./Modals";
import { RuleNamesWithParams } from "game/CompactRules";
import { doGameOptionsModifyVariant } from "game/variantAndRuleProcessing";
import { VariantScreenDimensions } from "./VariantScreenDimensions";
interface Props {
  measurements: VariantScreenDimensions;
  displayVariants: FutureVariantName[];
  selectedVariants: FutureVariantName[];
  setSelectedVariants: (x: FutureVariantName[]) => void;
  conflictLevel: AdviceLevel | undefined;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  ruleNamesWithParams?: RuleNamesWithParams;
}

const VariantCardGrid: SFC<Props> = ({
  style,
  measurements,
  displayVariants,
  selectedVariants,
  setSelectedVariants,
  conflictLevel,
  setVariantModalInfo,
  ruleNamesWithParams = {},
}) => {
  return (
    <View style={[style]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: measurements.cardGridSpacing,
        }}
        contentContainerStyle={{
          paddingVertical: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {displayVariants.map((variant) => {
            return (
              <VariantTileTest
                key={variant}
                variant={futureVariants[variant]}
                selected={selectedVariants.includes(variant)}
                conflictLevel={conflictLevel}
                onPress={(): void =>
                  selectedVariants.includes(variant)
                    ? setSelectedVariants(selectedVariants.filter((x) => x !== variant))
                    : setSelectedVariants([...selectedVariants, variant])
                }
                setVariantModalInfo={setVariantModalInfo}
                modified={doGameOptionsModifyVariant(
                  futureVariants[variant],
                  ruleNamesWithParams
                )}
                style={{
                  margin: measurements.cardGridSpacing,
                  width: measurements.cardSize,
                  height: measurements.cardSize,
                }}
              />
            );
          })}
        </View>
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
