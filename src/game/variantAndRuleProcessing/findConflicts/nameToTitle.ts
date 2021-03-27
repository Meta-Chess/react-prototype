import { FutureVariantName, futureVariants } from "game/variants";

export function nameToTitle(name: FutureVariantName): string {
  return futureVariants[name].title;
}
