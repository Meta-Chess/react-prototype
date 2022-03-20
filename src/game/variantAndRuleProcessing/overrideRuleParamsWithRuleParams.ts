import { RuleName } from "game";
import { RuleNamesWithParams } from "game/CompactRules";
import { keys } from "utilities";
import { injectParamValue } from "./optionsChangeRuleParam";

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
  keys(overrideRuleParams).forEach((ruleName) => {
    if (forRules.includes(ruleName)) {
      keys(overrideRuleParams[ruleName]).forEach((paramName) => {
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
