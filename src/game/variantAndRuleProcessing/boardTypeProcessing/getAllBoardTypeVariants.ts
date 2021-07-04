import { futureVariants } from "game";
import { FutureVariant } from "game/variants";
import { boardTypes } from "game/boardTypes";
import { keys } from "utilities";

export function getAllBoardTypeVariants(): FutureVariant[] {
  return keys(boardTypes).flatMap(
    (boardTypeName) => futureVariants[boardTypes[boardTypeName].baseVariant]
  );
}
