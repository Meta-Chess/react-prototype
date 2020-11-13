import { variantsBlacklist } from "game/variants";

export function CalcVariantClash(selectedVariants: (string | number)[]): boolean {
  const concatVariants = ([] as string[]).concat(
    ...selectedVariants.map((key) => key as string)
  );
  let existsVariantsClash = false;
  for (const selectedName of concatVariants) {
    if (selectedName in variantsBlacklist) {
      if (concatVariants.some((v) => v in variantsBlacklist[selectedName])) {
        existsVariantsClash = true;
        break;
      }
    }
  }
  return existsVariantsClash;
}
