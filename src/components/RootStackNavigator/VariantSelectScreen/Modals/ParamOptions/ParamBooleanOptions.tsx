import React, { useState } from "react";
import { View } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { LabeledCheckBox } from "ui";
import { gameOptionsChangeRuleParam } from "game/variantAndRuleProcessing";
import { ParamProps } from "./ParamProps";
import { ParamSettingBoolean } from "game/CompactRules";

export const ParamBooleanOptions: SFC<ParamProps> = ({
  ruleName,
  paramName,
  paramSettings,
  paramDefault,
  gameOptions,
  setGameOptions,
  style,
}) => {
  const paramSettingBoolean = paramSettings as ParamSettingBoolean;
  const paramDefaultBoolean = paramDefault as boolean;

  const [checkbox, setCheckbox] = useState(paramDefaultBoolean);

  return (
    <View
      style={[
        style,
        {
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
    >
      <Text cat={"BodyM"} color={Colors.TEXT.LIGHT_SECONDARY.toString()}>
        {paramName}
      </Text>
      <LabeledCheckBox
        value={checkbox}
        setValue={(value: boolean): void => {
          setCheckbox(value);
          setGameOptions(
            gameOptionsChangeRuleParam({
              ruleName: ruleName,
              paramName: paramName,
              gameOptions: gameOptions,
              paramSettings: paramSettingBoolean,
              paramNewValue: value,
            })
          );
        }}
        label={""}
        style={{ marginTop: 2 }}
      />
    </View>
  );
};
