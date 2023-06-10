import { futureVariants } from "game";
import { allTraitNames, TraitName } from "game/variants/traitInfo";
import { keys } from "utilities/keys";
import type { TraitFilter, ComplexityFilter, Filter } from "./filters";
import { traitOrder } from "game/variants/traitInfo";

interface FilterInfo<T extends Filter> {
  value: T["value"];
  count: number;
}

type FilterInfoForSet = {
  trait: FilterInfo<TraitFilter>[];
  complexity: FilterInfo<ComplexityFilter>[];
};

// TODO: soon sets will be groups of variants, and be passed into this function
export function getOrderedFilterInfoForSet(): FilterInfoForSet {
  const traitCounter: {
    [key in TraitName]: number;
  } = Object.assign({}, ...allTraitNames.map((name) => ({ [name]: 0 })));
  const complexityCounter: { [key in number]: number } = {};

  keys(futureVariants)
    .filter((variantName) => futureVariants[variantName].implemented)
    .map((variantName) => futureVariants[variantName])
    .forEach((variant) => {
      for (const trait of variant.traits) {
        traitCounter[trait] += 1;
      }
      complexityCounter[variant.complexity] =
        (complexityCounter[variant.complexity] ?? 0) + 1;
    });

  return {
    trait: keys(traitCounter)
      .sort((t1, t2) => (traitOrder.indexOf(t1) > traitOrder.indexOf(t2) ? 1 : -1))
      .map((trait) => ({
        value: trait,
        count: traitCounter[trait] ?? 0,
      })),
    complexity: Object.keys(complexityCounter)
      .sort((c1, c2) => (c1 > c2 ? 1 : -1))
      .map((complexity) => ({
        value: Number(complexity),
        count: complexityCounter[Number(complexity)],
      })),
  };
}
