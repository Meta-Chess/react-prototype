import { GameOptions } from "game/types";
import { variants, VariantName } from "game";
import { integrateWithOtherRules, futureVariants } from "game/variants";
import { deduplicateByName } from "utilities";

export function calculateGameOptions(selectedVariants: (string | number)[]): GameOptions {
  const rules = deduplicateByName(
    selectedVariants
      .flatMap((variantName) => futureVariants[variantName].rules)
      .concat(variants["Chess"].rules)
      .flatMap((rule, index, rules) =>
        integrateWithOtherRules[rule.name]
          ? integrateWithOtherRules[rule.name](rules)
          : [rule]
      )
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
