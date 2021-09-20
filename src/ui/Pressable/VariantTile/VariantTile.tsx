import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors, useHover, Text, StarIcon } from "primitives";
import { ConflictLevel, FutureVariant } from "game";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";
import { Styles } from "primitives/Styles";
import { AbsoluteView, TextIcon } from "ui";
import { allRuleSettings } from "game/CompactRules";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { VariantTileHeader } from "./VariantTileHeader";
import { VariantTileGraph } from "./VariantTileGraph";
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
        <VariantTileImage
          variant={variant}
          modified={modified}
          style={{
            width: 140,
            height: 140,
            marginHorizontal: 8,
            marginBottom: 8,
            backgroundColor: Colors.DARKER.toString(),
          }}
        />

        <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 8 }}>
          <VariantTileGraph variant={variant} />
        </View>
      </VariantTileBody>
      {!implemented && <CoverView />}
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)`
  width: 156px;
  background: transparent;
  ${Styles.BOX_SHADOW_STRONG}
  border-radius: 4px;
  overflow: hidden;
`;

const VariantTileBody = styled(View)<{ hovered: boolean }>`
  flex-direction: column;
  background-color: ${({ hovered }): string =>
    Colors.DARKISH.fade(hovered ? 0.6 : 0.5).toString()};
`;

const CoverView = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.25).toString()};
`;
