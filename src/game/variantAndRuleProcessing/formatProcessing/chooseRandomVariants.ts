import { FutureVariantName } from "game/variants/variants";
import { boardConflicts } from "../findConflicts/boardConflicts";
import { randomChoice } from "utilities/random";
import { processSelectedVariantCatagories } from "../findConflicts";

const NUMBER_TO_CHOOSE = 2;

export function chooseRandomVariants(variants: FutureVariantName[]): FutureVariantName[] {
  const selection: FutureVariantName[] = [];
  while (variants.length > 0 && selection.length <= NUMBER_TO_CHOOSE - 1) {
    const variant = randomChoice(variants);
    variants = variants.filter((v) => v !== variant);
    if (!reject([...selection, variant])) selection.push(variant);
  }
  return selection;
}

// TODO: the conflicts that are filtered should be listed nicely somewhere
// TODO: e.g. currently Hex + Pull + Cylinder warning shows when max selection is only 2
function reject(variants: FutureVariantName[]): boolean {
  return boardConflicts(processSelectedVariantCatagories(variants)).length > 0;
}
