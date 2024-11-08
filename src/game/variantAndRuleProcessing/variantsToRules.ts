import { RuleName } from "game/CompactRules";
import {
  futureVariants,
  integrateWithOtherRules,
  variants,
  FutureVariantName,
} from "game/variants";
import { uniq } from "lodash";

export function variantsToRules(variantNames: FutureVariantName[]): RuleName[] {
  const overrideBaseRules = variantNames.flatMap(
    (variantName) => futureVariants[variantName]?.overrideBaseRules || []
  );

  return uniq(
    variantNames
      .flatMap((variantName) => futureVariants[variantName].ruleNames)
      .concat(
        overrideBaseRules.length === 0 ? variants.chess.ruleNames : overrideBaseRules
      )
      .flatMap((ruleName, index, ruleNames) => {
        const integration = integrateWithOtherRules[ruleName];
        return integration ? integration(ruleNames) : [ruleName];
      })
  );
}
