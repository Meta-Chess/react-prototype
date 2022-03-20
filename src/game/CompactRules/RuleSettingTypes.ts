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
  excludedPieces: PieceName[];
  usePieceSets?: boolean; // if true removes graphical arrows and language from cycle to set for the param
  maxCycles?: number;
};

export interface AllRuleParamValue {
  "Max Chain Length": number;
  "Number of Checks": number;
  "Forced Pull": boolean;
  "Piece Cycles": PieceName[][];
  Species: PieceName[][];
  "No Attacking More Than": number;
  "Excited At": number;
  "True Fatigue": boolean;
  "And cannot move without assistance": boolean;
  "Square Durability": number;
  BOOM: number;
  "Immune Pieces": PieceName[][];
  "Deep Impact": boolean;
  "Diagonal Poles": boolean;
  "Only Friendly Dead Pieces": boolean;
}

export type ParamName = keyof AllRuleParamValue;
export type RuleParamValue = Partial<AllRuleParamValue>;

// ParamSetting should be the union of all ParamSettingType
export type ParamSetting =
  | ParamSettingInteger
  | ParamSettingBoolean
  | ParamSettingPieceCycles;
export type RuleSetting = { [paramName in ParamName]?: ParamSetting };
export type RuleParamValues = { [paramName in ParamName]?: ParamValue };

export type ParamValue = ParamSetting["defaultValue"];
