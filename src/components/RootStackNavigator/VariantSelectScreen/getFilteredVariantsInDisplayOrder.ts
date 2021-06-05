import { FutureVariantName, futureVariants } from "game";
import { TraitName } from "game/variants/traitInfo";
import { keys } from "utilities";

export function getFilteredVariantsInDisplayOrder(
  activeFilters: TraitName[]
): FutureVariantName[] {
  const variantNames = keys(futureVariants);
  return variantNames
    .filter(
      (variant) =>
        (activeFilters.length === 0 ||
          futureVariants[variant].traits.some((trait) =>
            activeFilters.includes(trait)
          )) &&
        futureVariants[variant].implemented
    )
    .sort((v1, v2) =>
      futureVariants[v1].complexity === futureVariants[v2].complexity
        ? futureVariants[v1].title.localeCompare(futureVariants[v2].title)
        : futureVariants[v1].complexity - futureVariants[v2].complexity
    );
}
