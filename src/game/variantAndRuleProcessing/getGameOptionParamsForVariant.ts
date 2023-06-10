import { FutureVariant } from "game/variants";
import { RuleNamesWithParams, RuleParamValues } from "game/CompactRules";
import { RuleName } from "game";
import { typecastKeys } from "utilities";

export const getGameOptionParamsForVariant = (
  variant: FutureVariant,
  ruleNamesWithParams?: RuleNamesWithParams
): [RuleName, RuleParamValues][] => {
  return variant.ruleNames.map((ruleName) => [
    ruleName,
    Object.assign(
      {},
      ...typecastKeys(ruleNamesWithParams?.[ruleName])
        .map((paramName) => ({
          [paramName]: ruleNamesWithParams?.[ruleName]?.[paramName],
        }))
        .filter((param) => param !== undefined)
    ),
  ]);
};
