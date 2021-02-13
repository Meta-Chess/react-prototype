import { GameOptions } from "game/types";
import {
  variants,
  integrateWithOtherRules,
  futureVariants,
  FutureVariantName,
} from "game/variants/variants";
import { FormatName } from "game/formats";
import { chooseRandomVariants } from "./formatProcessing";
import { uniq } from "lodash";

export function calculateGameOptions(
  gameOptions: GameOptions,
  selectedVariants: FutureVariantName[],
  selectedPlayers = 2,
  selectedFormat?: FormatName
): GameOptions {
  let variantsInPlay: FutureVariantName[] = [];
  if (selectedFormat === "variantComposition") {
    variantsInPlay = selectedVariants;
  } else if (selectedFormat === "randomVariants") {
    variantsInPlay = chooseRandomVariants(selectedVariants);
  } else {
    // if not handled, just do variant composition for now
    variantsInPlay = selectedVariants;
  }

  const ruleNames = uniq(
    variantsInPlay
      .flatMap((variantName) => futureVariants[variantName].ruleNames)
      .concat(variants.chess.ruleNames)
      .flatMap((ruleName, index, ruleNames) => {
        const integration = integrateWithOtherRules[ruleName];
        return integration ? integration(ruleNames) : [ruleName];
      })
      .sort((r1) => (r1 === "fatigue" ? 1 : -1)) //just temp ordering fatigue later TODO: Fix the bug that this handles properly - reset cloned pieces properly?
  );

  return { ...gameOptions, customRuleNames: ruleNames, numberOfPlayers: selectedPlayers };
}
