import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { AdviceLevel, FutureVariant } from "game";
import Color from "color";
import { GearButton } from "./GearButton";
import { StarIcon } from "primitives/icons";
import { TextIcon } from "ui";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { RuleNamesWithParamSettings } from "game/rules";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  conflictLevel: AdviceLevel | undefined;
  ruleSettings?: RuleNamesWithParamSettings;
  setVariantModalInfo: (x: VariantModalInfo) => void;
}

const BACKGROUND_COLOR: { [key in AdviceLevel]: Color } = {
  NEUTRAL: Colors.SUCCESS.fade(0.25), // todo: maybe handle types here better
  SUCCESS: Colors.SUCCESS.fade(0.25),
  ERROR: Colors.ERROR.fade(0.25),
  WARNING: Colors.WARNING.fade(0.25),
};

export const VariantTileHeader: SFC<Props> = ({
  variant,
  selected,
  ruleSettings = {},
  conflictLevel,
  setVariantModalInfo,
}) => {
  const color = !selected
    ? Colors.DARKISH
    : BACKGROUND_COLOR[conflictLevel || "SUCCESS"].mix(Colors.DARKISH, 0.4);

  const showGear = selected && Object.keys(ruleSettings).length > 0;
  return (
    <Container color={color}>
      <View style={{ width: 40, paddingLeft: "8px" }}>
        {showGear && (
          <GearButton
            variantTitle={variant.title}
            setVariantModalInfo={setVariantModalInfo}
            ruleSettings={ruleSettings}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <TitleText
          cat="DisplayXS"
          weight="heavy"
          color={Colors.TEXT.LIGHT.toString()}
          numberOfLines={1}
        >
          {variant.title}
        </TitleText>
      </View>
      <View
        style={{
          width: 40,
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextIcon Icon={StarIcon} />
        <Text
          cat="BodyS"
          weight="heavy"
          alignment="center"
          color={Colors.TEXT.LIGHT_SECONDARY.toString()}
          selectable={false}
        >
          {variant.complexity}
        </Text>
      </View>
    </Container>
  );
};

const Container = styled(View)<{ color: Color }>`
  height: 30px;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${({ color }): string => color.toString()};
`;

const TitleText = styled(Text)`
  padding-horizontal: 8px;
  text-align: center;
`;
