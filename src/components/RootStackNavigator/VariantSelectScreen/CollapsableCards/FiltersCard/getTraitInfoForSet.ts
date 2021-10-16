import { futureVariants, TraitsInSetInfo } from "game";
import { TraitName, allTraitNames, traitGraphOrder } from "game/variants/traitInfo";
import { keys } from "utilities/keys";
import { baseFilters } from "../../getFilteredVariantsInDisplayOrder";
import { BoardVariantName } from "game/boards";
import { FormatName } from "game/formats";

// TODO: soon sets will be groups of variants, and be passed into this function
export function getTraitInfoForSet(
  selectedFormat: FormatName,
  selectedBoard: BoardVariantName
): TraitsInSetInfo[] {
  const traitOrder = traitGraphOrder.flatMap((trait) => trait);
  const counter: {
    [key in TraitName]: number;
  } = Object.assign({}, ...allTraitNames.map((name) => ({ [name]: 0 })));
  keys(futureVariants)
    .filter((variant) =>
      baseFilters({
        variantName: variant,
        selectedFormat,
        selectedBoard,
      })
    )
    .map((variantName) => futureVariants[variantName])
    .forEach((variant) => {
      for (const trait of variant.traits) {
        counter[trait] += 1;
      }
    });
  return keys(counter)
    .sort((k1, k2) => (traitOrder.indexOf(k2) < traitOrder.indexOf(k1) ? 1 : -1))
    .map((key) => ({
      name: key,
      count: counter[key] ?? 0,
    }));
}
