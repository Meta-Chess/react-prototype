import { FormatName } from "game";
import { englishList } from "utilities/englishList";
import { VariantCatagories } from "./variantCatagories";
import { Conflict } from "./Conflict";
import { nameToTitle } from "./nameToTitle";

export function boardConflicts(
  format: FormatName,
  selectedVariants: VariantCatagories
): Conflict[] {
  const conflicts: Conflict[] = [];

  // polar incompatibility
  if (
    selectedVariants.boardCantHavePoles.length > 0 &&
    selectedVariants.boardHasPoles.length > 0
  )
    conflicts.push({
      message: `${englishList(selectedVariants.boardHasPoles.map(nameToTitle), {
        singular: "includes",
        plural: "include",
      })} polar wrapping across the top and bottom edges of the board, which currently are not compatible with ${englishList(
        selectedVariants.boardCantHavePoles.map(nameToTitle)
      )}.`,
      level: "ERROR", // TODO: some of these should be compatible with warnings in the future
    });

  // long board incompatibility
  if (
    selectedVariants.boardCantBeLong.length > 0 &&
    selectedVariants.boardIsLong.length > 0
  )
    conflicts.push({
      message: `${englishList(selectedVariants.boardCantBeLong.map(nameToTitle), {
        singular: "does",
        plural: "do",
      })} not work with different board shapes yet, and ${englishList(
        selectedVariants.boardIsLong.map(nameToTitle),
        {
          singular: "uses",
          plural: "use",
        }
      )} a long board.`,
      level: "ERROR",
    });

  return conflicts;
}
