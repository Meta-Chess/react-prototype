// Each ParamSettingType should have a corresponding type defined below
export enum ParamSettingType {
  "Integer",
}
export type ParamSettingInteger = {
  paramType: ParamSettingType;
  defaultValue: number;
  possibleValues: number[];
};

// ParamSetting should be the union of all ParamSettingType
export type ParamSetting = ParamSettingInteger;
export type ParamValue = ParamSetting["defaultValue"];

export type RuleSetting = { [paramName: string]: ParamSetting };
export type RuleParamValue = { [paramName: string]: ParamValue };
