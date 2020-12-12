import { FutureVariantName, futureVariants } from "game/variants/variants";
import { TraitClass } from "game/variants";

export function getFilteredVariantsInDisplayOrder(
  activeFilters: TraitClass[]
): FutureVariantName[] {
  const variantNames = Object.keys(futureVariants) as FutureVariantName[];
  return variantNames
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
