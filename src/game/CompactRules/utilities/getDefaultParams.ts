import { RuleParamValue, ParamName } from "../RuleSettingTypes";
import { allRuleSettings } from "../ruleSettings";
export const getDefaultParams = (ruleSettingsName: string): RuleParamValue => {
  return Object.assign(
    {},
    ...Object.keys(allRuleSettings[ruleSettingsName]).map((name) => ({
      [name as ParamName]: (allRuleSettings[ruleSettingsName][name as ParamName] || {})
        .defaultValue,
    }))
  );
};
