import { FutureVariantName } from "game/variants";
import { FormatName } from "game";
import { englishList } from "utilities/englishList";
import { CompactRules } from "game/rules";
import { VARIANT_CATAGORIES } from "./variantCatagories";
import { Conflict } from "./Conflict";
import { checkConflicts } from "./checkConflicts";
import { specialConflicts } from "./specialConflicts";
import { boardConflicts } from "./boardConflicts";
import { rollableVariants } from "game/formats/rollableVariants";
import { nameToTitle } from "./nameToTitle";

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

  const checkConflictsList = checkConflicts(selectedVariantCatagories, selectedRules);
  const specialConflictsList = specialConflicts(selectedVariantCatagories);
  const boardConflictsList = boardConflicts(selectedVariantCatagories);
  const numberOfConflicts =
    checkConflictsList.length + specialConflictsList.length + boardConflictsList.length;
  const defaultMessage: Conflict = {
    message: "This looks like fun!",
    level: "SUCCESS",
  };

  if (format === "randomVariants") {
    const randomMessage: Conflict = {
      message: "There are clashes which may effect your game:",
      level: "NEUTRAL",
    };
    return numberOfConflicts === 0
      ? [defaultMessage]
      : [randomMessage, ...checkConflictsList, ...specialConflictsList];
  } else if (format === "rollingVariants") {
    const nonRollingVariants = selectedVariants.filter(
      (variant) => !rollableVariants.includes(variant)
    );
    if (nonRollingVariants.length > 0) {
      const rollingConflict: Conflict = {
        message: `${englishList(nonRollingVariants.map(nameToTitle), {
          singular: "is",
          plural: "are",
        })} not compatible with rolling variants yet.`,
        level: "ERROR",
        type: "rollingVariants",
      };
      return [rollingConflict];
    } else {
      const rollingMessage: Conflict = {
        message: "There are clashes which may effect your game:",
        level: "NEUTRAL",
      };
      return numberOfConflicts === 0
        ? [defaultMessage]
        : [
            rollingMessage,
            ...checkConflictsList,
            ...specialConflictsList,
            ...boardConflictsList,
          ];
    }
  }

  if (numberOfConflicts === 0) return [defaultMessage];
  return [...checkConflictsList, ...specialConflictsList, ...boardConflictsList];
};
