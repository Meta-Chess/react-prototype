import { FutureVariantName, futureVariants } from "game";
import { TraitName } from "game/variants/traitInfo";
import { keys } from "utilities";
import { boardVariants, BoardVariantName, boardRestrictedVariants } from "game/boards";
import { formatVariantValidity, FormatName } from "game/formats";

export function getFilteredVariantsInDisplayOrder({
  selectedFormat,
  selectedBoard,
  userFilters,
}: {
  selectedFormat: FormatName;
  selectedBoard: BoardVariantName;
  userFilters: TraitName[];
}): FutureVariantName[] {
  const variantNames = keys(futureVariants);
  return variantNames
    .filter(
      (variant) =>
        baseFilters({
          variantName: variant,
          selectedFormat,
          selectedBoard,
        }) &&
        (userFilters.length === 0 ||
          futureVariants[variant].traits.some((trait) => userFilters.includes(trait)))
    )
    .sort((v1, v2) =>
      futureVariants[v1].complexity === futureVariants[v2].complexity
        ? futureVariants[v1].title.localeCompare(futureVariants[v2].title)
        : futureVariants[v1].complexity - futureVariants[v2].complexity
    );
}

function baseFilters({
  variantName,
  selectedFormat,
  selectedBoard,
}: {
  variantName: FutureVariantName;
  selectedFormat: FormatName;
  selectedBoard: BoardVariantName;
}): boolean {
  return (
    variantIsImplemented(variantName) &&
    variantNotABoard(variantName) &&
    variantValidWithFormat(variantName, selectedFormat) &&
    variantValidWithBoard(variantName, selectedBoard)
  );
}

function variantIsImplemented(variantName: FutureVariantName): boolean {
  return futureVariants[variantName].implemented;
}

function variantNotABoard(variantName: FutureVariantName): boolean {
  return !keys(boardVariants).includes(variantName as BoardVariantName);
}

function variantValidWithFormat(
  variantName: FutureVariantName,
  selectedFormat: FormatName
): boolean {
  return formatVariantValidity[selectedFormat].includes(variantName);
}

function variantValidWithBoard(
  variantName: FutureVariantName,
  selectedBoard: BoardVariantName
): boolean {
  return !keys(boardVariants).some((boardVariant) => {
    const boardContainedByVariant =
      boardRestrictedVariants[boardVariant].includes(variantName);
    const boardIsSelected = boardVariant === selectedBoard;
    return boardContainedByVariant && !boardIsSelected;
  });
}
