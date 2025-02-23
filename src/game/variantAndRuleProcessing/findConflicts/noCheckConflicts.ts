import { VariantCatagories } from "./variantCatagories";
import { Conflict } from "./Conflict";

export function noCheckConflicts(
  selectedVariants: VariantCatagories,
  selectedRules: string[]
): Conflict[] {
  const conflicts: Conflict[] = [];

  if (!selectedRules.includes("check")) {
    if (selectedVariants.threeCheck.length === 1) {
      conflicts.push({
        message: "3-Check has no effect if Check is disabled.",
        level: "WARNING",
      });
    }
  }
  return conflicts;
}
