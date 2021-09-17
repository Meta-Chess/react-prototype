import { ParamName, ParamSetting, ParamSettingType } from "./RuleSettingTypes";
import { PieceName } from "game/types";
import { RuleName } from ".";
import { every } from "lodash";

export type RuleSetting = `${RuleName}Settings`;

// NOTE: It's important we have the form ruleName + "Settings" as the keys of this dictionary
export const allRuleSettings: {
  [ruleSetting in RuleSetting]?: {
    [paramName in ParamName]?: ParamSetting;
  };
} = {
  atomicSettings: {
    "Deep Impact": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
    BOOM: {
      paramType: ParamSettingType.Integer,
      defaultValue: 2,
      allowValue: (n: number): boolean => n > -1 && n < 11,
    },
    "Immune Pieces": {
      paramType: ParamSettingType.PieceCycles,
      defaultValue: [[PieceName.Pawn]],
      allowValue: (sets: PieceName[][]): boolean =>
        sets.length == 1 && sets[0].length >= 0,
      excludedPieces: [],
      usePieceSets: true,
      maxCycles: 1,
    },
  },
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
  chemicallyExcitedKnightSettings: {
    "Excited At": {
      paramType: ParamSettingType.Integer,
      defaultValue: 3,
      allowValue: (value: number): boolean => {
        return value > -1 || value < 100;
      },
    },
  },
  noForkSettings: {
    "No Attacking More Than": {
      paramType: ParamSettingType.Integer,
      defaultValue: 1,
      allowValue: (value: number): boolean => {
        return value > -1 || value < 100;
      },
    },
  },
  patheticKingSettings: {
    "And cannot move without assistance": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  },
  fatigueSettings: {
    "True Fatigue": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  },
  pullSettings: {
    "Forced Pull": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  },
  thinIceSettings: {
    "Square Durability": {
      paramType: ParamSettingType.Integer,
      defaultValue: 4,
      allowValue: (v: number): boolean => v > 0,
    },
  },
  morphlingsSettings: {
    "Piece Cycles": {
      paramType: ParamSettingType.PieceCycles,
      defaultValue: [[PieceName.Knight, PieceName.Bishop]],
      allowValue: (cycles: PieceName[][]): boolean => {
        return cycles.length > 0 && cycles.every((cycle) => cycle.length > 1);
      },
      excludedPieces: [],
    },
  },
  polarSettings: {
    "Diagonal Poles": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  },
  extinctionSettings: {
    Species: {
      paramType: ParamSettingType.PieceCycles,
      defaultValue: [[]],
      allowValue: (sets: PieceName[][]): boolean => {
        return (
          (sets.length === 1 && sets[0].length === 0) ||
          sets.every((set) => set.length > 1)
        );
      },
      excludedPieces: [],
      usePieceSets: true,
    },
  },
  royallyScrewedSettings: {
    "Piece Cycles": {
      paramType: ParamSettingType.PieceCycles,
      defaultValue: [[PieceName.Queen, PieceName.King]],
      allowValue: (cycles: PieceName[][]): boolean => {
        return cycles.length > 0 && cycles.every((cycle) => cycle.length > 1);
      },
      excludedPieces: [],
    },
  },
};
