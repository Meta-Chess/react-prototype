import { futureVariants, FutureVariantName } from "game/variants/variants";
import { TraitName } from "game/variants";
import { TraitsInSetInfo } from "game/types";

//TODO: soon sets will be groups of variants, and be passed into this function
export function getTraitInfoForSet(): TraitsInSetInfo[] {
  const counter: { [key: string]: number } = {};
  for (const variant in futureVariants) {
    for (const trait of futureVariants[variant as FutureVariantName].traits) {
      if (trait in counter) counter[trait] += 1;
      else counter[trait] = 1;
    }
  }
  return Object.assign(
    {},
    Object.keys(counter)
      .sort((k1, k2) =>
        counter[k1] != counter[k2]
          ? counter[k1] > counter[k2]
            ? -1
            : 1
          : k2.localeCompare(k1)
          ? 1
          : -1
      )
      .map((key: string) => ({
        name: key as TraitName,
        count: counter[key],
      }))
  );
}
