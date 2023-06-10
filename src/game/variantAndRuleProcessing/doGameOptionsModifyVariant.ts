import { FutureVariant } from "game/variants";
import { RuleNamesWithParams } from "game/CompactRules";
import { typecastKeys } from "utilities";

export const doGameOptionsModifyVariant = (
  variant: FutureVariant,
  ruleNamesWithParams?: RuleNamesWithParams
): boolean => {
  return !!(
    ruleNamesWithParams &&
    variant.ruleNames.some(
      (ruleName) => typecastKeys(ruleNamesWithParams[ruleName]).length > 0
    )
  );
};
