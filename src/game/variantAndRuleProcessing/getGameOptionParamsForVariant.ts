import { FutureVariant } from "game/variants";
import { RuleNamesWithParams, ParamName, ParamValue } from "game/CompactRules";

export const getGameOptionParamsForVariant = (
  variant: FutureVariant,
  ruleNamesWithParams: RuleNamesWithParams
): { [paramName in ParamName]?: ParamValue }[] => {
  return variant.ruleNames
    .flatMap((ruleName) =>
      Object.keys((ruleNamesWithParams || {})[ruleName] || {}).map((paramName) => ({
        [paramName]: ((ruleNamesWithParams || {})[ruleName] || {})[
          paramName as ParamName
        ],
      }))
    )
    .filter((param) => param !== undefined);
};
