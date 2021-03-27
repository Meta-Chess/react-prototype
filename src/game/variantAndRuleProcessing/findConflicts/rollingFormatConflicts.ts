import { englishList } from "utilities/englishList";
import { Conflict } from "./Conflict";
import { rollableVariants } from "game/formats/rollableVariants";
import { nameToTitle } from "./nameToTitle";
import { FutureVariantName } from "game/variants";
import { defaultMessage, potentialClashMessage } from "./generalConflicts";

export function rollingFormatConflicts({
  selectedVariants,
  checkConflictsList,
  specialConflictsList,
  boardConflictsList,
}: {
  selectedVariants: FutureVariantName[];
  checkConflictsList: Conflict[];
  specialConflictsList: Conflict[];
  boardConflictsList: Conflict[];
}): Conflict[] {
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
  }
  if (
    checkConflictsList.length +
      specialConflictsList.length +
      boardConflictsList.length ===
    0
  )
    return [defaultMessage];
  return [
    potentialClashMessage,
    ...checkConflictsList,
    ...specialConflictsList,
    ...boardConflictsList,
  ];
}
