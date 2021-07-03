import React from "react";
import { TouchableOpacity } from "react-native";
import { SFC, Colors, useHover } from "primitives";
import { SparkleGearIcon } from "primitives/icons";
import {
  ModalInfo,
  ModalType,
} from "components/RootStackNavigator/VariantSelectScreen/Modals/shared/ModalTypes";
import { RuleNamesWithParamSettings } from "game/CompactRules";

interface Props {
  variantTitle: string;
  setModalInfo: (x: ModalInfo) => void;
  ruleSettings?: RuleNamesWithParamSettings;
}
export const GearButton: SFC<Props> = ({
  variantTitle,
  setModalInfo,
  ruleSettings = {},
  style,
}) => {
  const [ref, hovered] = useHover();
  return (
    <TouchableOpacity
      style={style}
      ref={ref}
      onPress={(): void => {
        setModalInfo({
          type: ModalType.variantModal,
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
