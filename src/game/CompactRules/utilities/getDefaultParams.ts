import { RuleParamValue } from "../RuleSettingTypes";
import { allRuleSettings } from "../ruleSettings";
import { keys } from "utilities";

export const getDefaultParams = (ruleSettingsName: string): RuleParamValue => {
  return Object.assign(
    {},
    ...keys(allRuleSettings[ruleSettingsName]).map((name) => ({
      [name]: allRuleSettings[ruleSettingsName][name]?.defaultValue,
    }))
  );
};
