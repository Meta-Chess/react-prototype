import { GameOptions } from "game";
import { RuleName } from "game";
import { ParamSetting, ParamName, ParamValue } from "game/rules/RuleSettingTypes";

export interface ParamProps {
  ruleName: RuleName;
  paramName: ParamName;
  paramSettings?: ParamSetting;
  paramDefault?: ParamValue;
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
}
