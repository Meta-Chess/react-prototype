import { ParamName, ParamSetting, ParamSettingType } from "./RuleSettingTypes";
import { PieceName } from "game/types";
import { RuleName } from ".";
import { propertyOf } from "lodash";
import { keys } from "utilities/keys";

/* eslint-disable @typescript-eslint/no-explicit-any */

type AllRuleSettingsProto = {
  [rule in RuleName]?: {
    [paramName in ParamName]?: ParamSetting;
  };
};

class AllRuleSettings implements AllRuleSettingsProto {
  promotion = {
    "Promotion Pieces": {
      paramType: ParamSettingType.PieceCycles,
      defaultValue: [
        [PieceName.Knight, PieceName.Bishop, PieceName.Rook, PieceName.Queen],
      ],
      allowValue: (sets: PieceName[][]): boolean =>
        sets.length == 1 && sets[0].length >= 0,
      excludedPieces: [],
      usePieceSets: true,
      maxCycles: 1,
    },
    "Only Friendly Dead Pieces": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
    "Non Promotion Moves": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  };

  atomic = {
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
  };
  longBoard = {
    Large: {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  };
  chainReaction = {
    "Max Chain Length": {
      paramType: ParamSettingType.Integer,
      defaultValue: 10,
      allowValue: (value: number): boolean => {
        return value > 0 || value < 100;
      },
    },
  };
  threeCheck = {
    "Number of Checks": {
      paramType: ParamSettingType.Integer,
      defaultValue: 3,
      allowValue: (value: number): boolean => {
        return value > 0 || value < 100;
      },
    },
  };
  chemicallyExcitedKnight = {
    "Excited At": {
      paramType: ParamSettingType.Integer,
      defaultValue: 3,
      allowValue: (value: number): boolean => {
        return value > -1 || value < 100;
      },
    },
  };
  noFork = {
    "No Attacking More Than": {
      paramType: ParamSettingType.Integer,
      defaultValue: 1,
      allowValue: (value: number): boolean => {
        return value > -1 || value < 100;
      },
    },
  };
  patheticKing = {
    "And cannot move without assistance": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  };
  fatigue = {
    "True Fatigue": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  };
  pull = {
    "Forced Pull": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  };
  thinIce = {
    "Square Durability": {
      paramType: ParamSettingType.Integer,
      defaultValue: 4,
      allowValue: (v: number): boolean => v > 0,
    },
  };
  morphlings = {
    "Piece Cycles": {
      paramType: ParamSettingType.PieceCycles,
      defaultValue: [[PieceName.Knight, PieceName.Bishop]],
      allowValue: (cycles: PieceName[][]): boolean => {
        return cycles.length > 0 && cycles.every((cycle) => cycle.length > 1);
      },
      excludedPieces: [],
    },
  };
  polar = {
    "Diagonal Poles": {
      paramType: ParamSettingType.Boolean,
      defaultValue: false,
    },
  };
  extinction = {
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
  };
  royallyScrewed = {
    "Piece Cycles": {
      paramType: ParamSettingType.PieceCycles,
      defaultValue: [[PieceName.Queen, PieceName.King]],
      allowValue: (cycles: PieceName[][]): boolean => {
        return cycles.length > 0 && cycles.every((cycle) => cycle.length > 1);
      },
      excludedPieces: [],
    },
  };

  static getDefaultsForRule<R extends RulesWithParams | RulesWithoutParams>(
    rule: R
  ): RuleDefaults<R> {
    const settings = AllRuleSettings._getDefaultRuleSettings(rule);
    if (!settings) return undefined as any;
    const getSetting = propertyOf(settings);
    return keys(settings).reduce(
      (acc, param) => ({
        ...acc,
        [param]: getSetting(`${param}.defaultValue`),
      }),
      {}
    ) as any;
  }

  static getDefaultRuleSettings<R extends RulesWithParams | RulesWithoutParams>(
    rule: R
  ): R extends RulesWithParams ? AllRuleSettings[R] : undefined {
    return AllRuleSettings._getDefaultRuleSettings(rule) as any;
  }

  private static _getDefaultRuleSettings(
    rule: any
  ): typeof rule extends RulesWithParams ? AllRuleSettings[RulesWithParams] : undefined {
    const allRuleSettings = new AllRuleSettings();
    if (assertType<RulesWithParams>(rule, (rule) => rule in allRuleSettings)) {
      return allRuleSettings[rule];
    }
  }
}

function assertType<T>(
  a: any,
  condition: (x: typeof a) => boolean = (): boolean => true
): a is T {
  return condition(a);
}

type RulesWithParams = RuleName & keyof AllRuleSettings;
type RulesWithoutParams = RuleName & Exclude<RuleName, RulesWithParams>;

type DefaultValue<T> = (T extends { defaultValue: unknown } ? T : never)["defaultValue"];
type DefaultValues<T> = { [k in keyof T]: DefaultValue<T[k]> };

type RuleDefaults<R extends RulesWithParams | RulesWithoutParams> =
  R extends RulesWithParams ? DefaultValues<AllRuleSettings[R]> : undefined;

type RuleSettings<R extends RulesWithParams | RulesWithoutParams> =
  R extends RulesWithParams ? AllRuleSettings[R] : undefined;

type RuleParams<R extends RuleName> = keyof RuleDefaults<R>;

const getDefaults = AllRuleSettings.getDefaultsForRule;

const getDefaultSettings = AllRuleSettings.getDefaultRuleSettings;

export {
  AllRuleSettings,
  getDefaultSettings,
  getDefaults,
  RuleDefaults as RuleParam,
  RuleSettings,
  RulesWithParams,
  RulesWithoutParams,
  RuleParams,
};
