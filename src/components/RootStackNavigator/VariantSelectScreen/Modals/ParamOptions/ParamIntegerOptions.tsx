import React, { useState } from "react";
import { View } from "react-native";
import { SFC, Colors, Text } from "primitives";
import { TextInput } from "ui";
import { gameOptionsChangeRuleParam } from "game/variantAndRuleProcessing";
import { ParamProps } from "./ParamProps";

export const ParamIntegerOptions: SFC<ParamProps> = ({
  ruleName,
  paramName,
  paramSettings,
  gameOptions,
  setGameOptions,
  style,
}) => {
  const storedParamsForRule = gameOptions.ruleNamesWithParams
    ? gameOptions.ruleNamesWithParams[ruleName]
    : undefined;
  const paramDefaultValue = storedParamsForRule
    ? storedParamsForRule[paramName as keyof typeof storedParamsForRule]
    : paramSettings.defaultValue;
  const [text, setText] = useState(
    (paramDefaultValue || paramSettings.defaultValue).toString()
  );

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
          if (paramSettings.possibleValues.includes(intValue)) {
            setGameOptions(
              gameOptionsChangeRuleParam(
                ruleName,
                paramName,
                paramSettings,
                parseInt(value),
                gameOptions
              )
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
