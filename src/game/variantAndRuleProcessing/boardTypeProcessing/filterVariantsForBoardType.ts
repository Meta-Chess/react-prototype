import { FutureVariantName, futureVariants } from "game";
import { boardTypes } from "game/boardTypes";
import { keys } from "utilities";
import { getVariantsSelectedBoard } from "./getVariantsSelectedBoard";

export function filterVariantsForBoardType(
  allVariants: FutureVariantName[],
  selectedVariants: FutureVariantName[]
): FutureVariantName[] {
  const boardType = getVariantsSelectedBoard(selectedVariants);

  // all variantNames which correspond to boardTypes
  const boardTypeVariants = keys(boardTypes).flatMap(
    (boardTypeName) => boardTypes[boardTypeName].baseVariant
  );
  // variantName which corresponds to selected boardType
  const selectedBoardTypeVariant = boardTypes[boardType].baseVariant;

  // all ruleNames which are contained by boardTypeVariants
  const boardTypeRules = boardTypeVariants.flatMap(
    (variantName) => futureVariants[variantName].ruleNames
  );
  // ruleNames which corresponds to selected boardType
  const selectedBoardTypeRules = futureVariants[selectedBoardTypeVariant].ruleNames;

  // rules to exclude - TODO: a more streamlined blacklist system could substitute in here instead
  const excludeBoardTypeRules = boardTypeRules.filter(
    (ruleName) => !selectedBoardTypeRules.includes(ruleName)
  );

  // 1) filter all base boardType variants
  // 2) filter all variants which have a boardType rule that is not from the selected boardType
  return allVariants
    .filter((variantName) => !boardTypeVariants.includes(variantName))
    .filter((variantName) =>
      futureVariants[variantName].ruleNames.every(
        (rule) => !excludeBoardTypeRules.includes(rule)
      )
    );
}
