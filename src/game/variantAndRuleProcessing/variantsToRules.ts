import { RuleName } from "game/CompactRules";
import {
  futureVariants,
  integrateWithOtherRules,
  variants,
  FutureVariantName,
} from "game/variants";
import { uniq } from "lodash";

export function variantsToRules(variantNames: FutureVariantName[]): RuleName[] {
  const overrideBaseRules = variantNames.some(
    (variantName) => futureVariants[variantName]?.overrideBaseRules
  );

  return uniq(
    variantNames
      .flatMap((variantName) => futureVariants[variantName].ruleNames)
      .concat(overrideBaseRules ? [] : variants.chess.ruleNames)
      .flatMap((ruleName, index, ruleNames) => {
        const integration = integrateWithOtherRules[ruleName];
        return integration ? integration(ruleNames) : [ruleName];
      })
  );
}
