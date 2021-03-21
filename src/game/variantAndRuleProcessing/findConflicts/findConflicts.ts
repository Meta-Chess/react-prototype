import { FutureVariantName } from "game/variants";
import { FormatName } from "game";
import { englishList } from "utilities/englishList";
import { CompactRules } from "game/rules";
import { VARIANT_CATAGORIES } from "./variantCatagories";
import { Conflict } from "./Conflict";
import { checkConflicts } from "./checkConflicts";
import { specialConflicts } from "./specialConflicts";
import { boardConflicts } from "./boardConflicts";

export const variantConflicts: {
  mainVariantGroup: FutureVariantName[];
  conflictingVariants: FutureVariantName[];
  mitigatingVariants?: FutureVariantName[];
  messageBuilder: (
    mainVariantTitles: string[],
    conflictingVariantTitles: string[],
    mitigatingVariantTitles?: string[]
  ) => string;
  level: "ERROR" | "WARNING";
}[] = [
  {
    mainVariantGroup: ["atomic"],
    conflictingVariants: ["mobius", "kleinBottle"],
    messageBuilder: (variant1Titles: string[], variant2Titles: string[]): string =>
      `Combining ${englishList(variant1Titles, {
        connector: "or",
      })} with ${englishList(variant2Titles, {
        connector: "or",
      })} leads to some strongly forcing paths that can make the game less fun`,
    level: "WARNING",
  },
];
export const findConflicts = (
  format: FormatName,
  selectedVariants: FutureVariantName[],
  checkEnabled?: boolean
): Conflict[] => {
  const selectedRules = new CompactRules(
    selectedVariants,
    [format],
    checkEnabled ? ["check"] : []
  ).getRuleNames();

  const selectedVariantCatagories = Object.assign(
    {},
    ...Object.keys(VARIANT_CATAGORIES).map((group) => ({
      [group]: selectedVariants.filter((variant) =>
        VARIANT_CATAGORIES[group].includes(variant)
      ),
    }))
  );

  return [
    ...checkConflicts(format, selectedVariantCatagories, selectedRules),
    ...specialConflicts(format, selectedVariantCatagories),
    ...boardConflicts(format, selectedVariantCatagories),
  ];
};

/*
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
*/
