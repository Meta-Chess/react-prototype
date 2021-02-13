import {
  futureVariants,
  integrateWithOtherRules,
  variants,
  FutureVariantName,
} from "game/variants";
import { uniq } from "lodash";
import { RuleName } from "game";

export function variantsToRules(variantNames: FutureVariantName[]): RuleName[] {
  return uniq(
    variantNames
      .flatMap((variantName) => futureVariants[variantName].ruleNames)
      .concat(variants.chess.ruleNames)
      .flatMap((ruleName, index, ruleNames) => {
        const integration = integrateWithOtherRules[ruleName];
        return integration ? integration(ruleNames) : [ruleName];
      })
      .sort((r1) => (r1 === "fatigue" ? 1 : -1)) //just temp ordering fatigue later TODO: Fix the bug that this handles properly - reset cloned pieces properly?
  );
}
