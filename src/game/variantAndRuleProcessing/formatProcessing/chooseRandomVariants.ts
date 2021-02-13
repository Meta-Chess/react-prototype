import { FutureVariantName } from "game/variants/variants";
import { random } from "lodash";

export function chooseRandomVariants(variants: FutureVariantName[]): FutureVariantName[] {
  //temp handling pick 2 as default
  if (variants.length <= 2) {
    return variants;
  } else {
    const firstIndex = random(0, variants.length - 1, false);
    let secondIndex = firstIndex;
    do {
      secondIndex = random(0, variants.length - 1, false);
    } while (firstIndex === secondIndex);
    return variants.filter((variant, i) => [firstIndex, secondIndex].includes(i));
  }
}
