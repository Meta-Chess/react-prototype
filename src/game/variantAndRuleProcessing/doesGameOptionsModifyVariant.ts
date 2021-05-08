import { FutureVariant } from "game/variants";
import { RuleNamesWithParams } from "game/CompactRules";

export const doesGameOptionsModifyVariant = (
  variant: FutureVariant,
  ruleNamesWithParams: RuleNamesWithParams
): boolean => {
  return variant.ruleNames.some(
    (ruleName) => Object.keys((ruleNamesWithParams || {})[ruleName] || {}).length > 0
  );
};
