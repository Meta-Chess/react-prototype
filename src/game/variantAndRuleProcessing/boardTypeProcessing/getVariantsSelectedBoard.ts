import { FutureVariantName } from "game";
import { boardTypes, BoardType } from "game/boardTypes";
import { keys } from "utilities";

export function getVariantsSelectedBoard(
  selectedVariants: FutureVariantName[]
): BoardType {
  const selectedBoardTypeName = keys(boardTypes).filter((boardTypeName) =>
    selectedVariants.includes(boardTypes[boardTypeName].baseVariant)
  )[0]; // TODO: there should only be one board selected - safeguard this a bit more?

  return boardTypes[selectedBoardTypeName];
}
