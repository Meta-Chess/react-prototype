import { PieceName } from "game/types";

// Each ParamSettingType should have a corresponding type defined below
export enum ParamSettingType {
  "Integer",
  "Boolean",
  "PieceCycles",
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

export type ParamSettingPieceCycles = {
  paramType: ParamSettingType;
  defaultValue: PieceName[][];
  allowValue: (value: PieceName[][]) => boolean;
  //describeValue: (value: PieceName[][]) => string;
};

export interface AllRuleParamValue {
  "Max Chain Length": number;
  "Number of Checks": number;
  "Forced Pull": boolean;
  "Piece Cycles": PieceName[][];
}

export type ParamName = keyof AllRuleParamValue;
export type RuleParamValue = Partial<AllRuleParamValue>;

// ParamSetting should be the union of all ParamSettingType
export type ParamSetting =
  | ParamSettingInteger
  | ParamSettingBoolean
  | ParamSettingPieceCycles;
export type RuleSetting = { [paramName in ParamName]?: ParamSetting };

export type ParamValue = ParamSetting["defaultValue"];
