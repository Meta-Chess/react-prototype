import { FutureVariantName, futureVariants } from "game/variants";
import { TraitClasses } from "game/types";
import { sortStr } from "utilities";

export function calculateVariantFilterAndDisplayOrder(
  activeFilters: TraitClasses[]
): FutureVariantName[] {
  return Object.keys(futureVariants)
    .filter((key) => futureVariants[key].implemented === true)
    .sort((n1, n2) => sortStr(n1, n2))
    .concat(
      Object.keys(futureVariants)
        .filter((key) => futureVariants[key].implemented !== true)
        .sort((n1, n2) => sortStr(n1, n2))
    )
    .filter(
      (key) =>
        activeFilters.length === 0 ||
        futureVariants[key].traitClasses.some((x: string) =>
          activeFilters.some((y) => y === x)
        )
    ) as FutureVariantName[];
}
