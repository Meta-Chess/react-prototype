import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { AdviceLevel, FutureVariant } from "game";
import { VariantTileHeader } from "./VariantTileHeader";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";
import { VariantTileLabels } from "./VariantTileLabels";
import { Styles } from "primitives/Styles";
import { AbsoluteView, Card } from "ui";
import { allRuleSettings } from "game/CompactRules";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
interface Props {
  variant: FutureVariant;
  selected: boolean;
  conflictLevel: AdviceLevel | undefined;
  onPress: () => void;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  modified: boolean;
}

export const VariantTileTest: SFC<Props> = ({
  style,
  variant,
  selected,
  conflictLevel,
  onPress,
  setVariantModalInfo,
  modified,
}) => {
  const implemented = variant.implemented;
  const ruleSettings = Object.assign(
    {},
    ...variant.ruleNames
      .filter(
        (ruleName) =>
          allRuleSettings[(ruleName + "Settings") as keyof typeof allRuleSettings]
      )
      .map((ruleName) => ({
        [ruleName]:
          allRuleSettings[(ruleName + "Settings") as keyof typeof allRuleSettings],
      }))
  );
  return (
    <TouchableContainer
      style={style}
      onPress={onPress}
      activeOpacity={0.6}
      disabled={!implemented}
    >
      <Card
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.DARK.toString(),
        }}
        outline={false}
      >
        <View style={{ flex: 1 }}>
          <VariantTileHeader
            variant={variant}
            selected={selected}
            conflictLevel={conflictLevel}
            ruleSettings={ruleSettings}
            setVariantModalInfo={setVariantModalInfo}
          />
        </View>
        <View
          style={{
            height: 140,
            width: "100%",
            backgroundColor: Colors.DARKER.toString(),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VariantTileImage
            variant={variant}
            modified={modified}
            style={{ width: 120, height: 120, margin: 8 }}
          />
        </View>
        <VariantTileLabels variant={variant} style={{ flex: 1 }} />
      </Card>
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  background: transparent;
  overflow: hidden;
`;

const VariantTileBody = styled(View)`
  flex-direction: row;
  background-color: ${Colors.DARK.toString()};
`;

const CoverView = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.25).toString()};
`;
