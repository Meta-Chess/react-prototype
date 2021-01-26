import {
  AdviceLevel,
  FutureVariantName,
  futureVariants,
  variantConflicts,
} from "game/variants";
import { intersection } from "lodash";
import { isPresent } from "ts-is-present";

export const findVariantConflicts = (
  selectedVariants: FutureVariantName[]
): { message: string; level: AdviceLevel }[] => {
  return variantConflicts
    .map((potentialConflict) => {
      const mainVariants = intersection(
        selectedVariants,
        potentialConflict.mainVariantGroup
      );

      if (mainVariants.length === 0) return undefined;

      const conflictingVariants = intersection(
        selectedVariants,
        potentialConflict.conflictingVariants
      );

      if (conflictingVariants.length === 0) return undefined;

      if (
        intersection(selectedVariants, potentialConflict.mitigatingVariants).length !== 0
      )
        return undefined;

      return {
        message: potentialConflict.messageBuilder(
          mainVariants.map(nameToTitle),
          conflictingVariants.map(nameToTitle),
          potentialConflict.mitigatingVariants?.map(nameToTitle)
        ),
        level: potentialConflict.level,
      };
    })
    .filter(isPresent);
};

function nameToTitle(name: FutureVariantName): string {
  return futureVariants[name].title;
}
