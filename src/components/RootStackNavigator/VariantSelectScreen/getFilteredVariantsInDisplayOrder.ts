import { FutureVariantName, futureVariants } from "game/variants";
import { TraitClass } from "game/types";

export function getFilteredVariantsInDisplayOrder(
  activeFilters: TraitClass[]
): FutureVariantName[] {
  return Object.keys(futureVariants)
    .map((k) => k as FutureVariantName)
    .filter(
      (variant) =>
        activeFilters.length === 0 ||
        futureVariants[variant].TraitClass.some((trait) => activeFilters.includes(trait))
    )
    .sort((v1, v2) =>
      futureVariants[v1].implemented && !futureVariants[v2].implemented
        ? -1
        : futureVariants[v2].implemented && !futureVariants[v1].implemented
        ? 1
        : futureVariants[v1].title.localeCompare(futureVariants[v2].title)
    );
}
