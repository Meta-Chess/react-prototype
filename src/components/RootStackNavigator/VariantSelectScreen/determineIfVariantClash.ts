import { FutureVariantName, variantsBlacklist } from "game/variants";

export const determineIfVariantClash = (
  selectedVariants: FutureVariantName[]
): boolean => {
  return selectedVariants
    .flatMap((variant) => variantsBlacklist[variant] || [])
    .some((blacklistedVariant) =>
      selectedVariants.includes(blacklistedVariant as FutureVariantName)
    );
};
