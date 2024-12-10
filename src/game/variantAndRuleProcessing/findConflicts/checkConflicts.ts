import { englishList } from "utilities/englishList";
import { VariantCatagories } from "./variantCatagories";
import { Conflict } from "./Conflict";
import { nameToTitle } from "./nameToTitle";

export function checkConflicts(
  selectedVariants: VariantCatagories,
  selectedRules: string[]
): Conflict[] {
  const conflicts: Conflict[] = [];

  if (selectedRules.includes("check")) {
    if (
      selectedVariants.triggersCheckCaringAboutPassiveMoves.length > 0 &&
      selectedVariants.heapsOfPassiveMoves.length > 0
    )
      conflicts.push({
        message: `${englishList([
          ...selectedVariants.triggersCheckCaringAboutPassiveMoves.map(nameToTitle),
          ...selectedVariants.heapsOfPassiveMoves.map(nameToTitle),
        ])} slows down check a lot.`,
        level: "ERROR",
      });
    else if (selectedVariants.highComputationalFreedom.length > 0)
      conflicts.push({
        message: `${englishList(
          selectedVariants.highComputationalFreedom.map(nameToTitle)
        )} may slow down check.`,
        level: "WARNING",
      });
    else if (selectedVariants.turnVariants.length > 0) {
      conflicts.push({
        message: `${englishList(
          selectedVariants.turnVariants.map(nameToTitle)
        )} (variants that modify turn structure) are not supported with Check enabled.`,
        level: "ERROR",
      });
    }
  }
  return conflicts;
}
