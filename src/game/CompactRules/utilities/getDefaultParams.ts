import { RuleParamValue } from "../RuleSettingTypes";
import { allRuleSettings, RuleSetting } from "../ruleSettings";
import { keys } from "utilities";

export const getDefaultParams = (ruleSettingsName: RuleSetting): RuleParamValue => {
  return Object.assign(
    {},
    ...keys(allRuleSettings[ruleSettingsName]).map((name) => ({
      [name]: allRuleSettings[ruleSettingsName]?.[name]?.defaultValue,
    }))
  );
};
