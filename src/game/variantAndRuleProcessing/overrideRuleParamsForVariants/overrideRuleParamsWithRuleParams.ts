import type { RuleName } from "game";
import type { RuleNamesWithParams } from "game/CompactRules";
import { typecastKeys } from "utilities";
import { injectParamValue } from "../optionsChangeRuleParam";

export const overrideRuleParamsWithRuleParams = ({
  baseRuleParams,
  overrideRuleParams,
  forRules,
}: {
  baseRuleParams: RuleNamesWithParams;
  overrideRuleParams?: RuleNamesWithParams;
  forRules: RuleName[];
}): RuleNamesWithParams => {
  if (!overrideRuleParams) return baseRuleParams;
  typecastKeys(overrideRuleParams).forEach((ruleName) => {
    if (forRules.includes(ruleName)) {
      typecastKeys(overrideRuleParams[ruleName]).forEach((paramName) => {
        baseRuleParams = injectParamValue({
          ruleName,
          paramName,
          tempParamOptions: baseRuleParams,
          paramNewValue: overrideRuleParams[ruleName]?.[paramName],
        });
      });
    }
  });
  return baseRuleParams;
};
