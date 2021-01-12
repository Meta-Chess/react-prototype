import { GameOptions } from "game/types";
import { variants } from "game";
import {
  integrateWithOtherRules,
  futureVariants,
  FutureVariantName,
} from "game/variants/variants";
import { uniq } from "lodash";

export function calculateGameOptions(
  gameOptions: GameOptions,
  selectedVariants: FutureVariantName[]
): GameOptions {
  const ruleNames = uniq(
    selectedVariants
      .flatMap((variantName) => futureVariants[variantName].ruleNames)
      .concat(variants.chess.ruleNames)
      .flatMap((ruleName, index, ruleNames) => {
        const integration = integrateWithOtherRules[ruleName];
        return integration ? integration(ruleNames) : [ruleName];
      })
      .sort((r1) => (r1 === "fatigue" ? 1 : -1)) //just temp ordering fatigue later TODO: Fix the bug that this handles properly - reset cloned pieces properly?
  );

  return { ...gameOptions, customRuleNames: ruleNames };
}
