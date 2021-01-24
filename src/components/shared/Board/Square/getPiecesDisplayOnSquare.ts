import { Square } from "game/board";
import { Token, TokenName } from "game/types";

export function getPiecesDisplayOnSquare(square: Square): (string | Token)[] {
  const display: (string | Token)[] = square.pieces.slice();
  square
    .tokensWithName(TokenName.AnimationToken)
    .filter((token) => token.data?.pieceVisualData !== undefined)
    .sort((t1, t2) =>
      t1.data?.pieceVisualData === undefined || t2.data?.pieceVisualData === undefined
        ? 1
        : t1.data.pieceVisualData.positionOnSquare <
          t2.data.pieceVisualData.positionOnSquare
        ? -1
        : 1
    )
    .forEach((token) => {
      if (token.data?.pieceVisualData?.positionOnSquare === undefined) return;
      display.splice(token.data?.pieceVisualData?.positionOnSquare, 0, token);
    });
  return display;
}
