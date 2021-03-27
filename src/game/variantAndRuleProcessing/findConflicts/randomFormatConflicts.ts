import { Conflict } from "./Conflict";
import { defaultMessage, potentialClashMessage } from "./generalConflicts";

export function randomFormatConflicts({
  checkConflictsList,
  specialConflictsList,
}: {
  checkConflictsList: Conflict[];
  specialConflictsList: Conflict[];
}): Conflict[] {
  // todo: make this nicer - boardConflicts are not allowed in random variants
  // ...there should probably be a clearer separation between conflicts which are filtered by the format selection
  return checkConflictsList.length + specialConflictsList.length === 0
    ? [defaultMessage]
    : [potentialClashMessage, ...checkConflictsList, ...specialConflictsList];
}
