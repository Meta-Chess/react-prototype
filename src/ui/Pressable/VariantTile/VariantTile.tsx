import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors, useHover } from "primitives";
import { ConflictLevel, FutureVariant } from "game";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";
import { Styles } from "primitives/Styles";
import { AbsoluteView } from "ui";
import { allRuleSettings } from "game/CompactRules";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { VariantTileHeader } from "./VariantTileHeader";
interface Props {
  variant: FutureVariant;
  selected: boolean;
  conflictLevel: ConflictLevel | undefined;
  onPress: () => void;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  modified: boolean;
}

export const VariantTile: SFC<Props> = ({
  style,
  variant,
  selected,
  conflictLevel,
  onPress,
  setVariantModalInfo,
  modified,
}) => {
  const [ref, hovered] = useHover();
  const implemented = variant.implemented;
  const hoverState = hovered && implemented;
  const ruleSettings = variant.ruleNames
    .filter((ruleName) => allRuleSettings[`${ruleName}Settings`] !== undefined)
    .reduce(
      (acc, ruleName) => ({ ...acc, [ruleName]: allRuleSettings[`${ruleName}Settings`] }),
      {}
    );
  return (
    <TouchableContainer
      ref={ref}
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
        setVariantModalInfo={setVariantModalInfo}
        hovered={hoverState}
      />
      <VariantTileBody hovered={hoverState}>
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

const VariantTileBody = styled(View)<{ hovered: boolean }>`
  flex-direction: row;
  background-color: ${({ hovered }): string =>
    Colors.DARK.fade(hovered ? 0.1 : 0).toString()};
`;

const CoverView = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.25).toString()};
`;
