import { FutureVariantName, futureVariants } from "game";

export const complexityLevels = ["Normal", "Hard", "Mind Bender", "Next"];
type ComplexityPartition = { [complexityLevel: string]: FutureVariantName[] };

//for now just partitioning by complexity
export function partitionDisplayVariantsByComplexity(
  displayVariants: FutureVariantName[]
): ComplexityPartition {
  const complexityPartition: ComplexityPartition = {
    Normal: [],
    Hard: [],
    "Mind Bender": [],
    Next: [],
  };

  for (let i = 0; i < displayVariants.length; i++) {
    const variant = displayVariants[i];
    const complexity = futureVariants[variant].complexity;
    if (complexity === 0) {
      complexityPartition["Next"].push(variant);
    } else if (complexity === 1 || complexity === 2) {
      complexityPartition["Normal"].push(variant);
    } else if (complexity > 2 && complexity < 6) {
      complexityPartition["Hard"].push(variant);
    } else {
      complexityPartition["Mind Bender"].push(variant);
    }
  }
  return complexityPartition;
}
