import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { ConflictLevel, FutureVariant } from "game";
import Color from "color";
import { GearButton } from "./GearButton";
import { StarIcon } from "primitives/icons";
import { TextIcon } from "ui";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { RuleNamesWithParamSettings } from "game/CompactRules";
import { keys } from "utilities";

interface Props {
  variant: FutureVariant;
  selected: boolean;
  hovered: boolean;
  conflictLevel?: ConflictLevel | "NO_CONFLICT";
  ruleSettings?: RuleNamesWithParamSettings;
  setVariantModalInfo: (x: VariantModalInfo) => void;
}

const BACKGROUND_COLOR: { [key in ConflictLevel | "NO_CONFLICT"]: Color } = {
  NO_CONFLICT: Colors.SUCCESS.fade(0.5),
  ERROR: Colors.ERROR.fade(0.5),
  WARNING: Colors.WARNING.fade(0.5),
};

export const VariantTileHeader: SFC<Props> = ({
  variant,
  selected,
  hovered,
  ruleSettings = {},
  conflictLevel = "NO_CONFLICT",
  setVariantModalInfo,
}) => {
  const color = (!selected ? Colors.DARK : BACKGROUND_COLOR[conflictLevel])
    .fade(hovered ? 0.1 : 0)
    .toString();

  const showGear = selected && keys(ruleSettings).length > 0;
  return (
    <Container color={color}>
      <View style={{ flex: 1 }}>
        <TitleText
          cat="DisplayXS"
          weight="thin"
          color={Colors.TEXT.LIGHT.toString()}
          numberOfLines={1}
        >
          {variant.shortTitle ?? variant.title}
        </TitleText>
      </View>
    </Container>
  );
};

const Container = styled(View)<{ color: string }>`
  height: 24px;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  background-color: ${({ color }): string => color};
`;

const TitleText = styled(Text)`
  padding-horizontal: 8px;
  text-align: center;
`;

/*

      <View
        style={{
          width: 24,
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "8px",
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
      */
/*
<View style={{ paddingLeft: "8px", width: 24 }}>
        {showGear && (
          <GearButton
            variantTitle={variant.title}
            setVariantModalInfo={setVariantModalInfo}
            ruleSettings={ruleSettings}
          />
        )}
      </View>
      */
