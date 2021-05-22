import React, { useState } from "react";
import { View } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { TextInput } from "ui";
import { optionsChangeRuleParam } from "game/variantAndRuleProcessing";
import { ParamProps } from "./ParamProps";
import { ParamSettingInteger } from "game/CompactRules/RuleSettingTypes";

export const ParamIntegerOptions: SFC<ParamProps> = ({
  ruleName,
  paramName,
  paramSettings,
  paramDefault,
  tempParamOptions,
  setTempParamOptions,
  style,
}) => {
  const paramDefaultInteger = paramDefault as number;
  const paramSettingInteger = paramSettings as ParamSettingInteger;
  const [text, setText] = useState(paramDefaultInteger.toString());

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
      <TextInput
        value={text}
        onChangeText={(value): void => {
          const intValue = parseInt(value);
          if (paramSettingInteger.allowValue(intValue)) {
            setTempParamOptions(
              optionsChangeRuleParam({
                ruleName: ruleName,
                paramName: paramName,
                tempParamOptions: tempParamOptions,
                paramSettings: paramSettingInteger,
                paramNewValue: intValue,
              })
            );
          }
          setText(value);
          return;
        }}
        style={{ marginLeft: 16, width: 40 }}
      />
    </View>
  );
};
