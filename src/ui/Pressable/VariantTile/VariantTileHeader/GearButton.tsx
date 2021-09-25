import React from "react";
import { TouchableOpacity } from "react-native";
import { SFC, Colors, useHover } from "primitives";
import { SparkleGearIcon } from "primitives/icons";
import { VariantModalInfo } from "components/RootStackNavigator/VariantSelectScreen/Modals";
import { RuleNamesWithParamSettings } from "game/CompactRules";

interface Props {
  variantTitle: string;
  setVariantModalInfo: (x: VariantModalInfo) => void;
  ruleSettings?: RuleNamesWithParamSettings;
}
export const GearButton: SFC<Props> = ({
  variantTitle,
  setVariantModalInfo,
  ruleSettings,
  style,
}) => {
  const [ref, hovered] = useHover();
  return (
    <TouchableOpacity
      style={style}
      ref={ref}
      onPress={(): void => {
        setVariantModalInfo({
          activated: true,
          variant: variantTitle,
          ruleSettings: ruleSettings,
        });
      }}
    >
      <SparkleGearIcon
        color={
          hovered
            ? Colors.TEXT.LIGHT_SECONDARY.fade(0.7).toString()
            : Colors.TEXT.LIGHT_SECONDARY.toString()
        }
      />
    </TouchableOpacity>
  );
};
