import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SFC } from "primitives";
import { FutureVariant } from "game";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { RuleNamesWithParamSettings } from "game/CompactRules";
import { keys } from "utilities";
import { TileAdvancedMenuButton } from "./TileAdvancedMenuButton";
import { GearIcon, CardLinkIcon } from "primitives/icons";

interface Props {
  variant: FutureVariant;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  ruleSettings: RuleNamesWithParamSettings;
}

export const TileAdvancedMenu: SFC<Props> = ({
  variant,
  setVariantModalInfo,
  ruleSettings,
  style,
}) => {
  const BUTTONS = [
    {
      name: "ShowVariantNeighbours",
      showWhen: true,
      onPress: (): void => {
        return;
      },
      Icon: CardLinkIcon,
    },
    {
      name: "VariantParameterModal",
      showWhen: keys(ruleSettings).length > 0,
      onPress: (): void => {
        setVariantModalInfo({
          activated: true,
          variant: variant.title,
          ruleSettings: ruleSettings,
        });
      },
      Icon: GearIcon,
    },
  ];

  return (
    <Container style={style}>
      {BUTTONS.filter((buttonInfo) => buttonInfo.showWhen).map((buttonInfo) => {
        return (
          <TileAdvancedMenuButton
            key={buttonInfo.name}
            onPress={buttonInfo.onPress}
            Icon={buttonInfo.Icon}
          />
        );
      })}
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  padding-horizontal: 32px;
`;
