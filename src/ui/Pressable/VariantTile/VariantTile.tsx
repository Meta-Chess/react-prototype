import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors, useHover } from "primitives";
import { ConflictLevel, FutureVariant } from "game";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";
import { RuleNamesWithParamSettings, AllRuleSettings } from "game/CompactRules";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { VariantTileHeader } from "./VariantTileHeader";
import { VariantTileTags } from "./VariantTileTags";
import Color from "color";
import { keys } from "utilities/keys";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  conflictLevel: ConflictLevel | undefined;
  onPress: () => void;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  modified: boolean;
  color: Color;
  detailedView?: boolean;
  zenMode?: boolean;
  size?: number;
}

export const VariantTile: SFC<Props> = ({
  style,
  variant,
  selected,
  conflictLevel,
  onPress,
  setVariantModalInfo,
  modified,
  color,
  detailedView,
  zenMode,
  size = 200,
}) => {
  if (conflictLevel !== undefined && selected) {
    color =
      conflictLevel === "ERROR"
        ? color.mix(Colors.ERROR.darken(0.4), 0.3)
        : color.mix(Colors.SUCCESS.darken(0.4), 0.3);
  } else if (selected) {
    color = color.mix(Colors.SUCCESS.darken(0.4), 0.3);
  }
  const imageWidth = useMemo(() => 0.6 * size, [size]);

  const [ref, hovered] = useHover();
  color = hovered ? color.fade(0.2) : color;
  const implemented = variant.implemented;

  const showDetailedView = (hovered || detailedView) && implemented && !zenMode;
  const showStar = showDetailedView;
  const showGear = !zenMode && hovered;

  const ruleSettings: RuleNamesWithParamSettings = useMemo(() => {
    const allRuleSettings = new AllRuleSettings();
    return variant.ruleNames
      .filter((ruleName) => ruleName in allRuleSettings)
      .reduce(
        (acc, ruleName) => ({
          ...acc,
          [ruleName]: allRuleSettings[ruleName as keyof AllRuleSettings],
        }),
        {}
      );
  }, []);

  const onGearPress = useMemo(
    () =>
      keys(ruleSettings).length > 0
        ? (): void => {
            setVariantModalInfo({
              activated: true,
              variant: variant.title,
              ruleSettings: ruleSettings,
            });
          }
        : undefined,
    [variant, ruleSettings]
  );

  return (
    <TouchableContainer
      ref={ref}
      style={{ opacity: implemented ? 1 : 0.4, ...style }}
      size={size}
      onPress={onPress}
      onLongPress={onGearPress}
      activeOpacity={0.6}
      disabled={!implemented}
      color={color}
    >
      <VariantImageContainer showDetailedView={showDetailedView}>
        <VariantTileImage
          variant={variant}
          modified={modified}
          size={imageWidth}
          style={{ backgroundColor: Colors.TRANSPARENT.toString() }}
        />
      </VariantImageContainer>
      <VariantTileContent>
        <VariantTileHeader
          {...{ variant, selected, hovered, showGear, showStar, onGearPress }}
        />
        {showDetailedView && (
          <VariantTileInfo variant={variant} style={{ width: "100%", height: "100%" }} />
        )}
        {showDetailedView && <VariantTileTags variant={variant} />}
      </VariantTileContent>
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)<{ color: Color; size: number }>`
  width: ${({ size }): string => size?.toString()}px;
  height: ${({ size }): string => size?.toString()}px;
  background: ${({ color }): string => color.toString()};
  overflow: hidden;
`;

const VariantTileContent = styled(View)`
  flex-direction: column;
  height: 100%;
  align-content: center;
  padding: 12px;
`;

const VariantImageContainer = styled(View)<{ showDetailedView?: boolean }>`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: ${({ showDetailedView }): number => (showDetailedView ? 0.1 : 1)};
  padding-top: 20px;
`;
