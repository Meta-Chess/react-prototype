import { RuleName } from "game/CompactRules";
import {
  futureVariants,
  integrateWithOtherRules,
  variants,
  FutureVariantName,
} from "game/variants";
import { uniq } from "lodash";

export function variantsToRules(variantNames: FutureVariantName[]): RuleName[] {
  return uniq(
    variantNames
      .flatMap((variantName) => futureVariants[variantName].ruleNames)
      .concat(variants.chess.ruleNames)
      .flatMap((ruleName, index, ruleNames) => {
        const integration = integrateWithOtherRules[ruleName];
        return integration ? integration(ruleNames) : [ruleName];
      })
  );
}
