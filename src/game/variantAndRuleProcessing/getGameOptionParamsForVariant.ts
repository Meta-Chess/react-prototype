import { FutureVariant } from "game/variants";
import { RuleNamesWithParams, ParamName, RuleParamValues } from "game/CompactRules";
import { RuleName } from "game";

export const getGameOptionParamsForVariant = (
  variant: FutureVariant,
  ruleNamesWithParams: RuleNamesWithParams
): [RuleName, RuleParamValues][] => {
  return variant.ruleNames.map((ruleName) => [
    ruleName,
    Object.assign(
      {},
      ...Object.keys((ruleNamesWithParams || {})[ruleName] || {})
        .map((paramName) => ({
          [paramName]: ((ruleNamesWithParams || {})[ruleName] || {})[
            paramName as ParamName
          ],
        }))
        .filter((param) => param !== undefined)
    ),
  ]);
};
