import { FutureVariant } from "game/variants";
import { RuleNamesWithParams } from "game/CompactRules";

export const doGameOptionsModifyVariant = (
  variant: FutureVariant,
  ruleNamesWithParams: RuleNamesWithParams
): boolean => {
  return (
    ruleNamesWithParams &&
    variant.ruleNames.some(
      (ruleName) => Object.keys(ruleNamesWithParams[ruleName] || {}).length > 0
    )
  );
};
