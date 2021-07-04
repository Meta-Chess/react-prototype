import { FutureVariantName } from "game";
import { boardTypes, BoardTypeName } from "game/boardTypes";
import { keys } from "utilities";

export function getVariantsSelectedBoard(
  selectedVariants: FutureVariantName[]
): BoardTypeName {
  const selectedBoardType = keys(boardTypes).filter((boardTypeName) =>
    selectedVariants.includes(boardTypes[boardTypeName].baseVariant)
  )[0]; // TODO: there should only be one board selected - safeguard this a bit more?

  return selectedBoardType;
}
