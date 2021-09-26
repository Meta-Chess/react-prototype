import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SFC, Colors, useHover } from "primitives";
import { ConflictLevel, FutureVariant } from "game";
import { VariantTileInfo } from "./VariantTileInfo";
import { VariantTileImage } from "./VariantTileImage";
import { allRuleSettings } from "game/CompactRules";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { VariantTileHeader } from "./VariantTileHeader";
import { VariantTileGraph } from "./VariantTileGraph";
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
  const [ref, hovered] = useHover();
  if (conflictLevel !== undefined && selected) {
    color =
      conflictLevel === "ERROR"
        ? color.mix(Colors.ERROR.darken(0.4), 0.3)
        : color.mix(Colors.SUCCESS.darken(0.4), 0.3);
  } else if (selected) {
    color = color.mix(Colors.SUCCESS.darken(0.4), 0.3);
  }
  color = hovered ? color.fade(0.2) : color;
  const implemented = variant.implemented;
  const showDetailedView = (hovered || detailedView) && implemented && !zenMode;
  const ruleSettings = variant.ruleNames
    .filter((ruleName) => allRuleSettings[`${ruleName}Settings`] !== undefined)
    .reduce(
      (acc, ruleName) => ({ ...acc, [ruleName]: allRuleSettings[`${ruleName}Settings`] }),
      {}
    );

  const imageWidth = useMemo(() => 0.6 * size, [size]);

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
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          opacity: showDetailedView ? 0.1 : 1,
          paddingTop: 20,
        }}
      >
        <VariantTileImage
          variant={variant}
          modified={modified}
          size={imageWidth}
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: Colors.TRANSPARENT.toString(),
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          height: "100%",
          alignContent: "center",
          padding: 12,
        }}
      >
        <VariantTileHeader
          {...{
            variant,
            selected,
            hovered,
            showStar: showDetailedView,
            showGear: !zenMode && hovered,
            onGearPress,
          }}
        />
        {showDetailedView && (
          <>
            <VariantTileBody style={{ width: "100%" }}>
              <VariantTileInfo
                variant={variant}
                style={{ width: "100%", height: "100%" }}
              />
            </VariantTileBody>
            <VariantTileGraph
              variant={variant}
              orientation={"horizontal"}
              style={{
                alignSelf: "center",
                width: "80%",
                marginBottom: 0,
                marginTop: "auto",
              }}
            />
          </>
        )}
      </View>
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)<{ color: Color; size: number }>`
  width: ${({ size }): string => size?.toString()}px;
  height: ${({ size }): string => size?.toString()}px;
  background: ${({ color }): string => color.toString()};
  overflow: hidden;
`;

const VariantTileBody = styled(View)`
  justify-content: center;
  align-items: center;
`;
