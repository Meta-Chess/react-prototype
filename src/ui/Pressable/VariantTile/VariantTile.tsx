import React, { useEffect, useState } from "react";
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
import { block } from "react-native-reanimated";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  conflictLevel: ConflictLevel | undefined;
  onPress: () => void;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  modified: boolean;
  color: Color;
  detailedView?: boolean;
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
}) => {
  const [ref, hovered] = useHover();
  color = selected ? color.mix(Colors.SUCCESS.darken(0.1), 0.3) : color;
  color = hovered ? color.fade(0.2) : color;
  const implemented = variant.implemented;
  const hoverState = (hovered || detailedView) && implemented;
  const ruleSettings = variant.ruleNames
    .filter((ruleName) => allRuleSettings[`${ruleName}Settings`] !== undefined)
    .reduce(
      (acc, ruleName) => ({ ...acc, [ruleName]: allRuleSettings[`${ruleName}Settings`] }),
      {}
    );

  const [h, setH] = useState(undefined);
  const [w, setW] = useState(undefined);

  useEffect(() => {
    setW(ref?.current?.offsetWidth);
    setH(ref?.current?.offsetHeight);
  }, [ref.current]);

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
          flexDirection: "column",
          height: "100%",
          alignContent: "center",
          padding: 12,
        }}
      >
        <TitleText
          cat="BodyM"
          weight="normal"
          color={Colors.TEXT.LIGHT.toString()}
          numberOfLines={1}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {variant.shortTitle ?? variant.title}
        </TitleText>
        {hoverState && (
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

      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          opacity: hoverState ? 0.1 : 1,
          paddingTop: 20,
        }}
      >
        <VariantTileImage
          variant={variant}
          modified={modified}
          size={0.6 * (w || 0)}
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: Colors.TRANSPARENT.toString(),
          }}
        />
      </View>
    </TouchableContainer>
  );
};

const TouchableContainer = styled(TouchableOpacity)<{ color: Color }>`
  width: 200px;
  height: 200px;
  background: ${({ color }): string => color.toString()};
  overflow: hidden;
`;

const VariantTileBody = styled(View)`
  justify-content: center;
  align-items: center;
  margin-left: 4px;
  margin-bottom: 4px;
`;

const TitleText = styled(Text)`
  padding-horizontal: 8px;
  text-align: center;
`;
