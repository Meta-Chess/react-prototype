import { FormatName } from "game";
import { englishList } from "utilities/englishList";
import { VariantCatagories } from "./variantCatagories";
import { Conflict } from "./Conflict";
import { nameToTitle } from "./nameToTitle";

export function generalConflicts(
  format: FormatName,
  selectedVariants: VariantCatagories
): Conflict[] {
  const conflicts: Conflict[] = [];

  // volatile + degrees of freedom
  if (
    selectedVariants.volatile.length > 0 &&
    selectedVariants.degreesOfFreedom.length > 0
  )
    conflicts.push({
      message: `Combining ${englishList(selectedVariants.volatile.map(nameToTitle), {
        connector: "or",
      })} with ${englishList(selectedVariants.degreesOfFreedom.map(nameToTitle), {
        connector: "or",
      })} can lead very easily to unexpected stalemates.`,
      level: "WARNING",
    });

  return conflicts;
}
