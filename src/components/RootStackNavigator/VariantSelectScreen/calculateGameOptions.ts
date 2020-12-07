import { GameOptions } from "game/types";
import { variants, VariantName } from "game";
import {
  integrateWithOtherRules,
  futureVariants,
  FutureVariantName,
} from "game/variants";
import { deduplicateByName } from "utilities";
import { check } from "game/Rules";

export function calculateGameOptions(selectedVariants: FutureVariantName[]): GameOptions {
  const rules = deduplicateByName(
    selectedVariants
      .flatMap((variantName) => futureVariants[variantName].rules)
      .concat(variants["Chess"].rules)
      .flatMap((rule, index, rules) =>
        integrateWithOtherRules[rule.name]
          ? integrateWithOtherRules[rule.name](rules)
          : [rule]
      )
      .sort((r1) => (r1.name === "Fatigue" ? 1 : -1)) //just temp ordering fatigue later
      .concat([check]) //just temp adding check
  );

  return {
    variant: "Variant Fusion" as VariantName,
    customTitle:
      selectedVariants
        .flatMap((variantName) => futureVariants[variantName].title)
        .join(" ") + " Chess",
    customRules: rules,
    time: undefined,
    checkEnabled: true,
    fatigueEnabled: false,
    atomicEnabled: false,
    flipBoard: false,
    overTheBoard: false,
    online: false,
  } as GameOptions;
}
