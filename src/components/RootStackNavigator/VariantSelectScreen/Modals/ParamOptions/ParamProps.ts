import { GameOptions } from "game";
import { RuleName } from "game";
import { ParamSetting } from "game/rules/RuleSettingTypes";

export interface ParamProps {
  ruleName: RuleName;
  paramName: string;
  paramSettings: ParamSetting;
  gameOptions: GameOptions;
  setGameOptions: (gameOptions: GameOptions) => void;
}
