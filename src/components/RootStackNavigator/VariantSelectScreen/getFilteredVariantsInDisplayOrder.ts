import { FutureVariantName, futureVariants } from "game";
import { getFilterCondition } from "./CollapsableCards/FiltersCard/filters";
import { keys } from "utilities";
import type { Filter } from "./CollapsableCards/FiltersCard/filters";

export function getFilteredVariantsInDisplayOrder(
  activeFilters: Filter[]
): FutureVariantName[] {
  const variantNames = keys(futureVariants);
  return variantNames
    .filter((variantName) => {
      const variant = futureVariants[variantName];
      return (
        variant.implemented &&
        activeFilters.every((filter) => {
          return filter.option === "include"
            ? getFilterCondition(filter)(variant)
            : !getFilterCondition(filter)(variant);
        })
      );
    })
    .sort((v1, v2) =>
      futureVariants[v1].complexity === futureVariants[v2].complexity
        ? futureVariants[v1].title.localeCompare(futureVariants[v2].title)
        : futureVariants[v1].complexity - futureVariants[v2].complexity
    );
}
