import { FutureVariant } from "game/variants";
import { RuleNamesWithParams } from "game/rules";

export const getGameOptionParamsForVariant = (
  variant: FutureVariant,
  ruleNamesWithParams: RuleNamesWithParams
): { [paramName: string]: number }[] => {
  return variant.ruleNames
    .flatMap((ruleName) =>
      Object.keys((ruleNamesWithParams || {})[ruleName] || {}).map((paramName) => ({
        [paramName]: ((ruleNamesWithParams || {})[ruleName] || {})[paramName],
      }))
    )
    .filter((param) => param !== undefined);
};
