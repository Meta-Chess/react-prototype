import {
  ParamSettingType,
  ParamSetting,
  ParamSettingInteger,
  ParamSettingBoolean,
} from "game/CompactRules";

export const ruleParamTypeGuard = {
  [ParamSettingType.Integer]: (paramSetting: ParamSetting): ParamSettingInteger => {
    return paramSetting as ParamSettingInteger;
  },
  [ParamSettingType.Boolean]: (paramSetting: ParamSetting): ParamSettingBoolean => {
    return paramSetting as ParamSettingBoolean;
  },
};
