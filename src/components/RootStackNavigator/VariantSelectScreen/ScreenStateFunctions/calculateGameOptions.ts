import { GameOptions } from "game/types";
import { variants } from "game";
import {
  integrateWithOtherRules,
  futureVariants,
  FutureVariantName,
} from "game/variants/variants";
import { deduplicateByName } from "utilities";

export function calculateGameOptions(
  gameOptions: GameOptions,
  selectedVariants: FutureVariantName[]
): GameOptions {
  const rules = deduplicateByName(
    selectedVariants
      .flatMap((variantName) => futureVariants[variantName].rules)
      .concat(variants["Chess"].rules)
      .flatMap((rule, index, rules) =>
        integrateWithOtherRules[rule.name]
          ? integrateWithOtherRules[rule.name](rules)
          : [rule]
      )
      .sort((r1) => (r1.name === "Fatigue" ? 1 : -1)) //just temp ordering fatigue later TODO: Fix the bug that this handles properly - reset cloned pieces properly?
  );

  return { ...gameOptions, customRules: rules };
}
