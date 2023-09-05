import { FutureVariant } from "game/variants";
import { RuleNamesWithParams } from "game/CompactRules";
import { keys } from "utilities";

export const doGameOptionsModifyVariant = (
  variant: FutureVariant,
  ruleNamesWithParams?: RuleNamesWithParams
): boolean => {
  return !!(
    ruleNamesWithParams &&
    variant.ruleNames.some((ruleName) => keys(ruleNamesWithParams[ruleName]).length > 0)
  );
};
