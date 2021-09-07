import { Conflict } from "game/variantAndRuleProcessing/findConflicts/Conflict";
import { FormatName } from "game/formats";
import { ConflictLevel } from "game";

// TODO: this should be moved and integrated into findConflicts
export function getConflictLevel(
  format: FormatName,
  variantConflicts: Conflict[]
): ConflictLevel | undefined {
  if (format === "randomVariants") {
    return undefined;
  } else if (format === "rollingVariants")
    return variantConflicts.some((conflict) => conflict.type === "rollingVariants")
      ? "ERROR"
      : undefined;
  return variantConflicts.some((conflict) => conflict.level === "ERROR")
    ? "ERROR"
    : variantConflicts.some((conflict) => conflict.level === "WARNING")
    ? "WARNING"
    : undefined;
}
