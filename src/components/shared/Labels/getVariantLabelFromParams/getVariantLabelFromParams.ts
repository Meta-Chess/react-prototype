import { FutureVariant } from "game/variants";
import {
  RuleNamesWithParams,
  AllRuleParamValue,
  allRuleSettings,
  ParamSettingType,
  ParamName,
} from "game/CompactRules";
import {
  doGameOptionsModifyVariant,
  getGameOptionParamsForVariant,
} from "game/variantAndRuleProcessing";
import { pieceCyclesLabel } from "./pieceCyclesLabel";

export function getVariantLabelFromParams(
  variant: FutureVariant,
  ruleNamesWithParams: RuleNamesWithParams
): string {
  let details = "";
  if (doGameOptionsModifyVariant(variant, ruleNamesWithParams)) {
    getGameOptionParamsForVariant(variant, ruleNamesWithParams).forEach((tuple) => {
      const ruleName = tuple[0];
      const params = tuple[1];
      Object.keys(params).forEach((paramName) => {
        const paramType =
          allRuleSettings[ruleName.toString() + "Settings"][
            paramName as keyof AllRuleParamValue
          ]?.paramType;

        if (paramType === ParamSettingType.PieceCycles) {
          details += pieceCyclesLabel(params, paramName as ParamName);
        } else {
          details += details + "\n- " + paramName + ": " + params[paramName as ParamName];
        }
      });
    });
  }
  return details;
}
