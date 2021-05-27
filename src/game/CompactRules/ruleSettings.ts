import { ParamName, ParamSetting, ParamSettingType } from "./RuleSettingTypes";
import { PieceName } from "game/types";

//NOTE: It's important we have the form ruleName + "Settings" as the keys of this dictionary
export const allRuleSettings: {
  [ruleSettingsName: string]: {
    [paramName in ParamName]?: ParamSetting;
  };
} = {
  chainReactionSettings: {
    "Max Chain Length": {
      paramType: ParamSettingType.Integer,
      defaultValue: 10,
      allowValue: (value: number): boolean => {
        return value > 0 || value < 100;
      },
    },
  },
  threeCheckSettings: {
    "Number of Checks": {
      paramType: ParamSettingType.Integer,
      defaultValue: 3,
      allowValue: (value: number): boolean => {
        return value > 0 || value < 100;
      },
    },
  },
  pullSettings: {
    "Forced Pull": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  },
  morphlingsSettings: {
    "Piece Cycles": {
      paramType: ParamSettingType.PieceCycles,
      defaultValue: [[PieceName.Knight, PieceName.Bishop]],
      allowValue: (value: PieceName[][]): boolean => {
        value;
        return true;
      },
    },
  },
  royallyScrewedSettings: {
    "Piece Cycles": {
      paramType: ParamSettingType.PieceCycles,
      defaultValue: [[PieceName.Queen, PieceName.King]],
      allowValue: (value: PieceName[][]): boolean => {
        value;
        return true;
      },
    },
  },
};
