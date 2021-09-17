import { RuleName } from "game";
import {
  ParamSetting,
  ParamName,
  ParamValue,
  RuleNamesWithParams,
} from "game/CompactRules";

export interface ParamProps {
  ruleName: RuleName;
  paramName: ParamName;
  paramSettings?: ParamSetting;
  paramDefault?: ParamValue;
  tempParamOptions?: RuleNamesWithParams;
  setTempParamOptions: (tempParamOptions: RuleNamesWithParams) => void;
}
