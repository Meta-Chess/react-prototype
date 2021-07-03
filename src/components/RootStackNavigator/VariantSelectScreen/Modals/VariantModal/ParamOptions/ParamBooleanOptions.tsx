import React, { useState } from "react";
import { View } from "react-native";
import { SFC } from "primitives";
import { LabeledCheckBox } from "ui";
import { optionsChangeRuleParam } from "game/variantAndRuleProcessing";
import { ParamProps } from "./shared";
import { ItemTitle } from "components/RootStackNavigator/VariantSelectScreen/Modals/shared";
import { ParamSettingBoolean } from "game/CompactRules";

export const ParamBooleanOptions: SFC<ParamProps> = ({
  ruleName,
  paramName,
  paramSettings,
  paramDefault,
  tempParamOptions,
  setTempParamOptions,
  style,
}) => {
  const paramSettingBoolean = paramSettings as ParamSettingBoolean;
  const paramDefaultBoolean = paramDefault as boolean;

  const [checkbox, setCheckbox] = useState(paramDefaultBoolean);

  return (
    <View style={style}>
      <ItemTitle itemTitle={paramName} />
      <LabeledCheckBox
        value={checkbox}
        setValue={(value: boolean): void => {
          setCheckbox(value);
          setTempParamOptions(
            optionsChangeRuleParam({
              ruleName: ruleName,
              paramName: paramName,
              tempParamOptions: tempParamOptions,
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
