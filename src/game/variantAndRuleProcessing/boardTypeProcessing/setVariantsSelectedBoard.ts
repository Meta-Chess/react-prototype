import { FutureVariantName } from "game";
import { boardTypes, BoardType } from "game/boardTypes";
import { keys } from "utilities";

export function setVariantsSelectedBoard(
  selectedVariants: FutureVariantName[],
  setSelectedVariants: (x: FutureVariantName[]) => void,
  boardType: BoardType
): void {
  const allBoardVariants = keys(boardTypes).map(
    (boardTypeName) => boardTypes[boardTypeName].baseVariant
  );

  setSelectedVariants([
    ...selectedVariants.filter((variantName) => !allBoardVariants.includes(variantName)),
    boardType.baseVariant,
  ]);
}
