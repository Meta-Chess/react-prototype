import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors } from "primitives";
import { AdviceLevel, FutureVariant } from "game";
import { VariantTileHeader } from "./VariantTileHeader";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";
import { Styles } from "primitives/Styles";
import { AbsoluteView } from "ui";
import { allRuleSettings } from "game/CompactRules";
import { ModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals/shared/ModalTypes";
interface Props {
  variant: FutureVariant;
  selected: boolean;
  conflictLevel: AdviceLevel | undefined;
  onPress: () => void;
  setModalInfo: (x: ModalInfo) => void;
  modified: boolean;
}

export const VariantTile: SFC<Props> = ({
  style,
  variant,
  selected,
  conflictLevel,
  onPress,
  setModalInfo,
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
      <VariantTileHeader
        variant={variant}
        selected={selected}
        conflictLevel={conflictLevel}
        ruleSettings={ruleSettings}
        setModalInfo={setModalInfo}
      />
      <VariantTileBody>
        <VariantTileInfo variant={variant} style={{ flex: 1 }} />
        <VariantTileImage
          variant={variant}
          modified={modified}
          style={{ width: 120, height: 120, margin: 8 }}
        />
      </VariantTileBody>
      {!implemented && <CoverView />}
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  width: 300px;
  background: transparent;
  ${Styles.BOX_SHADOW_STRONG}
  border-radius: 4px;
  overflow: hidden;
`;

const VariantTileBody = styled(View)`
  flex-direction: row;
  background-color: ${Colors.DARK.toString()};
`;

const CoverView = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.25).toString()};
`;
