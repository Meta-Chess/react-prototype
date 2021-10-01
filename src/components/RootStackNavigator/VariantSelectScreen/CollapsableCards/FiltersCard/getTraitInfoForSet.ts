import { futureVariants, TraitsInSetInfo } from "game";
import { TraitName, allTraitNames } from "game/variants/traitInfo";
import { keys } from "utilities/keys";

// TODO: soon sets will be groups of variants, and be passed into this function
export function getTraitInfoForSet(): TraitsInSetInfo[] {
  const counter: {
    [key in TraitName]: number;
  } = Object.assign({}, ...allTraitNames.map((name) => ({ [name]: 0 })));
  keys(futureVariants)
    .filter((variantName) => futureVariants[variantName].implemented)
    .map((variantName) => futureVariants[variantName])
    .forEach((variant) => {
      for (const trait of variant.traits) {
        counter[trait] += 1;
      }
    });
  return keys(counter)
    .sort((k1, k2) =>
      counter[k1] != counter[k2]
        ? counter[k1] > counter[k2]
          ? -1
          : 1
        : k2.localeCompare(k1)
        ? -1
        : 1
    )
    .map((key) => ({
      name: key,
      count: counter[key] ?? 0,
    }));
}
