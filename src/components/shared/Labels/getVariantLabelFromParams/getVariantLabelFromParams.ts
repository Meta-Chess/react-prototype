import { FutureVariant } from "game/variants";
import {
  getDefaultSettings,
  ParamName,
  ParamSettingType,
  RuleNamesWithParams,
  RulesWithParams,
} from "game/CompactRules";
import {
  doGameOptionsModifyVariant,
  getGameOptionParamsForVariant,
} from "game/variantAndRuleProcessing";
import { pieceCyclesLabel } from "./pieceCyclesLabel";
import { typecastKeys } from "utilities";
import { ParamSettingPieceCycles } from "game/CompactRules/RuleSettingTypes";

export function getVariantLabelFromParams(
  variant: FutureVariant,
  ruleNamesWithParams?: RuleNamesWithParams
): string {
  let details = "";
  if (doGameOptionsModifyVariant(variant, ruleNamesWithParams)) {
    getGameOptionParamsForVariant(variant, ruleNamesWithParams).forEach((tuple) => {
      const ruleName = tuple[0] as RulesWithParams;
      const params = tuple[1];
      const ruleSetting = getDefaultSettings(ruleName);
      typecastKeys(params).forEach((paramName) => {
        const paramSetting =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          paramName in ruleSetting ? (ruleSetting as any)[paramName] : undefined;
        const paramType = paramSetting?.paramType;

        if (paramType === ParamSettingType.PieceCycles) {
          const isSet = (paramSetting as ParamSettingPieceCycles).usePieceSets;
          details += pieceCyclesLabel(params, paramName as ParamName, isSet);
        } else {
          details += "\n- " + paramName + ": " + params[paramName];
        }
      });
    });
  }
  return details;
}
