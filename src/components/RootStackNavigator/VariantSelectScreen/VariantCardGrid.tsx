import React, { useState } from "react";
import { View, ScrollView, Switch } from "react-native";
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
import { IconButton } from "ui/Buttons/IconButton";
import { GoEye, GoEyeClosed } from "react-icons/go";

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
  const [detailedView, setDetailedView] = useState(true);
  return (
    <View style={style}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 80 }}
      >
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {displayVariants.map((variant, i) => {
            return (
              <VariantTile
                key={variant}
                detailedView={detailedView}
                color={i % 2 === 0 ? Colors.DARK : Colors.DARKER} //Colors.DARK : Colors.DARKER
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
              />
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          bottom: 20,
          width: 70,
          height: 40,
          backgroundColor: Colors.DARKISH.toString(),
          borderRadius: 10,
        }}
      >
        <IconButton
          // style={{ borderRadius: 100, overflow: "hidden" }}
          size={detailedView ? 30 : 30}
          color={detailedView ? Colors.WHITE : Colors.WHITE}
          Icon={detailedView ? GoEye : GoEyeClosed}
          onPress={(): void => setDetailedView(!detailedView)}
        />
      </View>
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
