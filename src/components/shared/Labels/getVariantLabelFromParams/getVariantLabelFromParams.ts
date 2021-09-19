import { FutureVariant } from "game/variants";
import {
  RuleNamesWithParams,
  ParamSettingType,
  ParamName,
  AllRuleSettings,
} from "game/CompactRules";
import {
  doGameOptionsModifyVariant,
  getGameOptionParamsForVariant,
} from "game/variantAndRuleProcessing";
import { pieceCyclesLabel } from "./pieceCyclesLabel";
import { keys } from "utilities";
import { ParamSettingPieceCycles } from "game/CompactRules/RuleSettingTypes";

export function getVariantLabelFromParams(
  variant: FutureVariant,
  ruleNamesWithParams?: RuleNamesWithParams
): string {
  let details = "";
  const allRuleSettings = new AllRuleSettings();
  if (doGameOptionsModifyVariant(variant, ruleNamesWithParams)) {
    getGameOptionParamsForVariant(variant, ruleNamesWithParams).forEach((tuple) => {
      const ruleName = tuple[0];
      const params = tuple[1];
      keys(params).forEach((paramName) => {
        const ruleSetting = ((allRuleSettings as any)[ruleName] as any)[paramName];
        const paramType = ruleSetting?.paramType;

        if (paramType === ParamSettingType.PieceCycles) {
          const isSet = (ruleSetting as ParamSettingPieceCycles).usePieceSets;
          details += pieceCyclesLabel(params, paramName as ParamName, isSet);
        } else {
          details += "\n- " + paramName + ": " + params[paramName];
        }
      });
    });
  }
  return details;
}
