import { range } from "lodash";
import { ParamSettingType, ParamSettingInteger } from "./RuleSettingTypes";

const MAX_CHAIN_LENGTH: ParamSettingInteger = {
  paramType: ParamSettingType.Integer,
  defaultValue: 5,
  possibleValues: range(1, 64),
};

export const RULE_SETTINGS = {
  "Max Chain Length": MAX_CHAIN_LENGTH,
};
