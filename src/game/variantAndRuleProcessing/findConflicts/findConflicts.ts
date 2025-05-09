import { FutureVariantName } from "game/variants";
import { FormatName } from "game";
import { CompactRules } from "game/CompactRules";
import { VariantCatagories, VARIANT_CATAGORIES } from "./variantCatagories";
import { Conflict } from "./Conflict";
import { checkConflicts } from "./checkConflicts";
import { noCheckConflicts } from "./noCheckConflicts";
import { specialConflicts } from "./specialConflicts";
import { boardConflicts } from "./boardConflicts";
import { setupConflicts } from "./setupConflicts";
import { rollingFormatConflicts } from "./rollingFormatConflicts";
import { randomFormatConflicts } from "./randomFormatConflicts";
import { defaultMessage } from "./generalConflicts";
import { keys } from "utilities";

export function processSelectedVariantCatagories(
  selectedVariants: FutureVariantName[]
): VariantCatagories {
  return Object.assign(
    {},
    ...keys(VARIANT_CATAGORIES).map((group) => ({
      [group]: selectedVariants.filter((variant) =>
        VARIANT_CATAGORIES[group].includes(variant)
      ),
    }))
  );
}

export const findConflicts = (
  format: FormatName,
  selectedVariants: FutureVariantName[],
  checkEnabled?: boolean
): Conflict[] => {
  const selectedRules = new CompactRules( //note we aren't caring about rule params here
    selectedVariants,
    [format],
    checkEnabled ? ["check"] : []
  ).getRuleNames();

  const selectedVariantCatagories = processSelectedVariantCatagories(selectedVariants);

  const checkConflictsList = checkConflicts(selectedVariantCatagories, selectedRules);
  const noCheckConflictList = noCheckConflicts(selectedVariantCatagories, selectedRules);
  const specialConflictsList = specialConflicts(selectedVariantCatagories);
  const boardConflictsList = boardConflicts(selectedVariantCatagories);
  const setupConflictsList = setupConflicts(selectedVariantCatagories);

  switch (format) {
    case "randomVariants": {
      return randomFormatConflicts({
        checkConflictsList: checkConflictsList,
        specialConflictsList: specialConflictsList,
      });
    }
    case "rollingVariants": {
      return rollingFormatConflicts({
        selectedVariants: selectedVariants,
        checkConflictsList: checkConflictsList,
        specialConflictsList: specialConflictsList,
        boardConflictsList: boardConflictsList,
      });
    }
  }

  const allConflicts = [
    ...checkConflictsList,
    ...noCheckConflictList,
    ...specialConflictsList,
    ...boardConflictsList,
    ...setupConflictsList,
  ];

  if (allConflicts.length === 0) return [defaultMessage];
  return allConflicts;
};
