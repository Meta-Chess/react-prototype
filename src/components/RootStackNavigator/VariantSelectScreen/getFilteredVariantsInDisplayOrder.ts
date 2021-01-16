import { FutureVariantName, futureVariants, TraitName } from "game";

export function getFilteredVariantsInDisplayOrder(
  activeFilters: TraitName[]
): FutureVariantName[] {
  const variantNames = Object.keys(futureVariants) as FutureVariantName[];
  return variantNames
    .filter(
      (variant) =>
        activeFilters.length === 0 ||
        futureVariants[variant].traits.some((trait) => activeFilters.includes(trait))
    )
    .sort((v1, v2) =>
      futureVariants[v1].implemented && !futureVariants[v2].implemented
        ? -1
        : futureVariants[v2].implemented && !futureVariants[v1].implemented
        ? 1
        : futureVariants[v1].complexity === futureVariants[v2].complexity
        ? futureVariants[v1].title.localeCompare(futureVariants[v2].title)
        : futureVariants[v1].complexity - futureVariants[v2].complexity
    );
}
