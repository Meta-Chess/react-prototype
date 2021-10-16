import { englishList } from "utilities/englishList";
import { VariantCatagories } from "./variantCatagories";
import { Conflict } from "./Conflict";
import { nameToTitle } from "./nameToTitle";

export function specialConflicts(selectedVariants: VariantCatagories): Conflict[] {
  const conflicts: Conflict[] = [];

  // no fork
  if (
    selectedVariants.noFork.length > 0 &&
    selectedVariants.thatCanMakeNoForkStalemate.length > 0
  )
    conflicts.push({
      message: `Combining ${englishList(selectedVariants.noFork.map(nameToTitle), {
        connector: "or",
      })} with ${englishList(
        selectedVariants.thatCanMakeNoForkStalemate.map(nameToTitle),
        {
          connector: "or",
        }
      )} can lead to unexpected stalemates.`,
      level: "WARNING",
    });

  // combinatoric hex, pull and cylinder
  if (selectedVariants.combinatoricHexCylinderPull.length === 3)
    conflicts.push({
      message: `${englishList(
        selectedVariants.combinatoricHexCylinderPull.map(nameToTitle)
      )} can create a combinatorial explosion with promotion, which may kill your browser.`,
      level: "WARNING",
    });

  // TODO: an easy way to filter out cylindrical for circular, as toroidal exists - can do this more generally
  if (selectedVariants.overrideCylinderOnCircular.length === 2)
    conflicts.push({
      message: "Variants are overridden by other variants",
      level: "ERROR",
    });

  return conflicts;
}
