import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC, Text, Colors } from "primitives";
import { FutureVariant } from "game";
import { GearButton } from "./GearButton";
import { StarIcon } from "primitives/icons";
import { TextIcon } from "ui";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { RuleNamesWithParamSettings } from "game/CompactRules";
import { keys } from "utilities";

interface Props {
  variant: FutureVariant;
  hovered: boolean;
  ruleSettings?: RuleNamesWithParamSettings;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  showGear?: boolean;
  showStar?: boolean;
}

export const VariantTileHeader: SFC<Props> = ({
  variant,
  hovered,
  ruleSettings,
  setVariantModalInfo,
  showGear = hovered && keys(ruleSettings).length > 0,
  showStar = hovered,
  style,
}) => {
  return (
    <Container style={style}>
      <View style={{ marginLeft: 0, marginTop: -4, marginRight: "auto" }}>
        {showGear && (
          <GearButton
            variantTitle={variant.title}
            setVariantModalInfo={setVariantModalInfo}
            ruleSettings={ruleSettings}
          />
        )}
      </View>
      <TitleText
        cat="BodyM"
        weight="normal"
        color={Colors.TEXT.LIGHT.toString()}
        numberOfLines={1}
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {variant.shortTitle ?? variant.title}
      </TitleText>
      <View
        style={{
          marginRight: 0,
          marginTop: -7,
          marginLeft: "auto",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showStar && (
          <>
            <TextIcon Icon={StarIcon} style={{ marginTop: -1 }} />
            <Text
              cat="BodyS"
              weight="heavy"
              alignment="center"
              color={Colors.TEXT.LIGHT_SECONDARY.toString()}
              selectable={false}
            >
              {variant.complexity}
            </Text>
          </>
        )}
      </View>
    </Container>
  );
};

const Container = styled(View)`
  justify-content: center;
  flex-direction: row;
  height: 15%;
  width: 100%;
`;

const TitleText = styled(Text)`
  text-align: center;
`;
