import { ParamSettingType, ParamSettingInteger } from "./RuleSettingTypes";

const NUMBER_OF_CHECKS: ParamSettingInteger = {
  paramType: ParamSettingType.Integer,
  defaultValue: 3,
  possibleValues: [1, 2, 3, 4, 5, 6],
};

export const RULE_SETTINGS = {
  "Number of Checks": NUMBER_OF_CHECKS,
};
