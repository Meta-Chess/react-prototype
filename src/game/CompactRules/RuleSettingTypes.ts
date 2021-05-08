// Each ParamSettingType should have a corresponding type defined below
export enum ParamSettingType {
  "Integer",
  "Boolean",
}
export type ParamSettingInteger = {
  paramType: ParamSettingType;
  defaultValue: number;
  allowValue: (value: number) => boolean;
};

export type ParamSettingBoolean = {
  paramType: ParamSettingType;
  defaultValue: boolean;
};

export interface AllRuleParamValue {
  "Max Chain Length": number;
  "Number of Checks": number;
  "Forced Pull": boolean;
}

export type ParamName = keyof AllRuleParamValue;
export type RuleParamValue = Partial<AllRuleParamValue>;

// ParamSetting should be the union of all ParamSettingType
export type ParamSetting = ParamSettingInteger | ParamSettingBoolean;
export type RuleSetting = { [paramName in ParamName]?: ParamSetting };

export type ParamValue = ParamSetting["defaultValue"];
