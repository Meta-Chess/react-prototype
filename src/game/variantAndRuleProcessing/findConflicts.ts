import {
  AdviceLevel,
  FutureVariantName,
  futureVariants,
  variantConflicts,
} from "game/variants";
import { intersection } from "lodash";
import { isPresent } from "ts-is-present";
import { FormatName, futureVariants as allVariants } from "game";
import { englishList } from "utilities/englishList";
import { rollableVariants } from "game/formats/rollableVariants";

interface Conflict {
  message: string;
  level: AdviceLevel;
}

export const findConflicts = (
  format: FormatName,
  selectedVariants: FutureVariantName[]
): Conflict[] => {
  let relevantVariantConflicts = [] as Conflict[];
  if (format === "variantComposition") {
    relevantVariantConflicts = variantConflicts
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
          intersection(selectedVariants, potentialConflict.mitigatingVariants).length !==
          0
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
  }

  const formatConflicts: Conflict[] = [];
  if (format === "rollingVariants") {
    const selectedVariantsThatShouldNotRoll = selectedVariants.filter(
      (variantName) => !rollableVariants.includes(variantName)
    );
    if (selectedVariantsThatShouldNotRoll.length !== 0) {
      formatConflicts.push({
        message: `${englishList(
          selectedVariantsThatShouldNotRoll.map(
            (variantName) => allVariants[variantName].title
          ),
          {
            singular: "doesn't",
            plural: "don't",
          }
        )} work with rolling variants yet`,
        level: "ERROR",
      });
    }

    // TODO: use rolling variants parameter for number of variants rather than `4`
    if (selectedVariants.length < 4) {
      formatConflicts.push({
        message:
          "Rolling variants won't do anything unless there are at least 4 variants selected",
        level: "WARNING",
      });
    }
  }

  return [...formatConflicts, ...relevantVariantConflicts];
};

function nameToTitle(name: FutureVariantName): string {
  return futureVariants[name].title;
}
