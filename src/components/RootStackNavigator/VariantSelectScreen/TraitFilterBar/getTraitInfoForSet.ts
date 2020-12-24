import { futureVariants, FutureVariantName } from "game/variants/variants";
import { TraitClass } from "game/variants";

//TODO: soon sets will be groups of variants, and be passed into this function
export function getTraitInfoForSet(): [TraitClass, number][] {
  const counter: { [key: string]: number } = {};
  for (const variant in futureVariants) {
    for (const trait of futureVariants[variant as FutureVariantName].TraitClass) {
      if (trait in counter) counter[trait] += 1;
      else counter[trait] = 1;
    }
  }
  return Object.keys(counter)
    .map((key: string) => [key, counter[key]] as [TraitClass, number])
    .sort((i1, i2) =>
      i1[1] != i2[1] ? (i1[1] > i2[1] ? -1 : 1) : i2[0].localeCompare(i1[0]) ? 1 : -1
    );
}
