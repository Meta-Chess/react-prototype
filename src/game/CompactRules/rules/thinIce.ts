import { Board, Square } from "game/Board";
import { TokenName } from "game/types";
import { PieceDelta } from "game/Move";
import { Rule, ParameterRule, OnPieceDisplaced } from "../CompactRules";

export const thinIce: ParameterRule = (params): Rule => {
  return {
    title: "Thin Ice",
    description:
      "You're skating on thin ice! When a square is moved to multiple times it breaks.",

    onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
      const landingSquare = board.squareAt(pieceDelta.path.getEnd());
      const squareDurability = params?.["Square Durability"];

      incrementThinIceToken(landingSquare, squareDurability);

      if (squareShouldBreak(landingSquare)) breakSquare(board, pieceDelta);

      return { board, pieceDelta };
    },
  };
};

function breakSquare(board: Board, pieceDelta: PieceDelta): void {
  board.killPiecesAt({ piecesLocation: pieceDelta.path.getEnd() });
  delete board.squares[pieceDelta.path.getEnd()];
}

function squareShouldBreak(square?: Square): boolean {
  return getStepAllowanceOnSquare(square) <= 0;
}

function getStepAllowanceOnSquare(square?: Square): number {
  return square?.firstTokenWithName(TokenName.ThinIce)?.data?.thinIceData || 0;
}

function incrementThinIceToken(square?: Square, squareDurability?: number): void {
  if (!square) return;
  const currentToken = square.firstTokenWithName(TokenName.ThinIce);
  square.removeTokensByName(TokenName.ThinIce);
  square.addToken({
    name: TokenName.ThinIce,
    data: { thinIceData: (currentToken?.data?.thinIceData ?? squareDurability ?? 1) - 1 },
    expired: () => false,
  });
}
