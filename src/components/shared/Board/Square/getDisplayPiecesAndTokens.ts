import { Square } from "game/board";
import { Token, TokenName } from "game/types";

export function getDisplayPiecesAndTokens(square: Square): (string | Token)[] {
  const display: (string | Token)[] = [...square.pieces];
  square
    .tokensWithName(TokenName.AnimationToken)
    .filter((token) => token.data?.pieceVisualData !== undefined)
    .sort((t1, t2) =>
      t1.data?.pieceVisualData === undefined || t2.data?.pieceVisualData === undefined
        ? 0
        : t1.data.pieceVisualData.positionOnSquare -
          t2.data.pieceVisualData.positionOnSquare
    )
    .forEach((token) => {
      if (token.data?.pieceVisualData?.positionOnSquare !== undefined)
        display.splice(token.data?.pieceVisualData?.positionOnSquare, 0, token);
    });
  return display;
}
