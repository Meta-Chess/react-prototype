import { englishList } from "utilities/englishList";
import { VariantCatagories } from "./variantCatagories";
import { Conflict } from "./Conflict";
import { nameToTitle } from "./nameToTitle";

export function setupConflicts(selectedVariants: VariantCatagories): Conflict[] {
  const conflicts: Conflict[] = [];

  // setup incompatibility
  if (
    selectedVariants.mutuallyExclusiveBoardSetups.length > 1 ||
    (selectedVariants.mutuallyExclusiveBoardSetups.length === 1 &&
      selectedVariants.boardIsLong.length > 0)
  ) {
    const firstSelectedVariant = selectedVariants.mutuallyExclusiveBoardSetups[0];
    const otherClashingVariants = [
      ...selectedVariants.mutuallyExclusiveBoardSetups.slice(1),
      ...selectedVariants.boardIsLong,
    ];

    conflicts.push({
      message: `${nameToTitle(
        firstSelectedVariant
      )} includes a setup of pieces which are not supported on ${englishList(
        otherClashingVariants.map(nameToTitle)
      )}.`,
      level: "ERROR",
    });
  }

  return conflicts;
}
