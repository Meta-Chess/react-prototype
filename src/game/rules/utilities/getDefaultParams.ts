import { RuleParamValue, RuleSetting } from "../RuleSettingTypes";

export const getDefaultParams = (ruleSettings: RuleSetting): RuleParamValue => {
  return Object.assign(
    {},
    ...Object.keys(ruleSettings).map((name) => ({
      [name]: ruleSettings[name].defaultValue,
    }))
  );
};
