import { FutureVariant } from "game/variants";
import {
  RuleNamesWithParams,
  allRuleSettings,
  ParamSettingType,
  ParamName,
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
  if (doGameOptionsModifyVariant(variant, ruleNamesWithParams)) {
    getGameOptionParamsForVariant(variant, ruleNamesWithParams).forEach((tuple) => {
      const ruleName = tuple[0];
      const params = tuple[1];
      keys(params).forEach((paramName) => {
        const ruleSetting = allRuleSettings[`${ruleName}Settings`]?.[paramName];
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
