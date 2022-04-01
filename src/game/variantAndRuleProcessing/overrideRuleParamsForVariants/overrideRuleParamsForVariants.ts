import { FutureVariantName, futureVariants } from "game/variants";
import type { RuleName } from "game/CompactRules";
import type { RuleNamesWithParams } from "game/CompactRules";
import { overrideRuleParamsWithRuleParams } from "./overrideRuleParamsWithRuleParams";

export const overrideRuleParamsForVariants = ({
  variants,
  rules,
  baseRuleParams,
}: {
  variants: FutureVariantName[];
  rules: RuleName[];
  baseRuleParams: RuleNamesWithParams;
}): RuleNamesWithParams => {
  variants.forEach((variantName) => {
    const variantRuleParams = futureVariants[variantName]?.overrideRuleParams;
    baseRuleParams = overrideRuleParamsWithRuleParams({
      baseRuleParams,
      overrideRuleParams: variantRuleParams,
      forRules: rules,
    });
  });
  return baseRuleParams;
};
