import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors, useHover, Text } from "primitives";
import { ConflictLevel, FutureVariant } from "game";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";
import { Styles } from "primitives/Styles";
import { AbsoluteView } from "ui";
import { allRuleSettings } from "game/CompactRules";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { VariantTileHeader } from "./VariantTileHeader";
import { VariantTileGraph } from "./VariantTileGraph";
import Color from "color";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  conflictLevel: ConflictLevel | undefined;
  onPress: () => void;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  modified: boolean;
  color: Color;
}

export const VariantTile: SFC<Props> = ({
  style,
  variant,
  selected,
  conflictLevel,
  onPress,
  setVariantModalInfo,
  modified,
  color = Color,
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
      color={color}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: color.toString(),
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <TitleText
          cat="DisplayXS"
          weight="thin"
          color={Colors.TEXT.LIGHT.toString()}
          numberOfLines={1}
        >
          {variant.shortTitle ?? variant.title}
        </TitleText>
      </View>

      <VariantTileBody hovered={hoverState} color={color}>
        <VariantTileImage
          variant={variant}
          modified={modified}
          style={{
            width: 140,
            height: 140,
            backgroundColor: color.toString(),
          }}
        />
        <View
          style={{
            width: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VariantTileGraph variant={variant} style={{ flex: 1 }} />
        </View>
      </VariantTileBody>
      {!implemented && <CoverView />}
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)<{ color: Color }>`
  width: 200px;
  height: 200px;
  background: ${({ color }): string => color.toString()};
  ${Styles.BOX_SHADOW_STRONG}
  border-radius: 4px;
  overflow: hidden;
  padding-vertical: 16px;
`;

const VariantTileBody = styled(View)<{ hovered: boolean; color: Color }>`
  flex-direction: row;
  background-color: ${({ hovered, color }): string =>
    color.fade(hovered ? 0.1 : 0).toString()};
  justify-content: center;
  align-items: center;
  margin-left: 4;
  margin-bottom: 4;
`;

const CoverView = styled(AbsoluteView)`
  background-color: ${Colors.BLACK.fade(0.25).toString()};
`;

const TitleText = styled(Text)`
  padding-horizontal: 8px;
  text-align: center;
`;
