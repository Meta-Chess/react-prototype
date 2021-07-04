import { FutureVariantName } from "game";
import { boardTypes, BoardTypeName } from "game/boardTypes";
import { keys } from "utilities";

export function setVariantsSelectedBoard(
  selectedVariants: FutureVariantName[],
  setSelectedVariants: (x: FutureVariantName[]) => void,
  boardType: BoardTypeName
): void {
  const allBoardVariants = keys(boardTypes).map(
    (boardTypeName) => boardTypes[boardTypeName].baseVariant
  );

  setSelectedVariants([
    ...selectedVariants.filter((variantName) => !allBoardVariants.includes(variantName)),
    boardTypes[boardType].baseVariant,
  ]);
}
