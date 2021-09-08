import { Board, Square } from "game/Board";
import { TokenName } from "game/types";
import { PieceDelta } from "game/Move";
import { Rule, ParameterRule, OnPieceDisplaced } from "../CompactRules";

const STEPS_TO_BREAK = 3;

export const thinIce: ParameterRule = (): Rule => {
  return {
    title: "Thin Ice",
    description:
      "You're skating on thin ice! When a square is moved to multiple times it breaks.",

    onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
      const landingSquare = board.squareAt(pieceDelta.path.getEnd());

      incrementThinIceToken(landingSquare);

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

function incrementThinIceToken(square?: Square): void {
  if (!square) return;
  const currentToken = square.firstTokenWithName(TokenName.ThinIce);
  square.removeTokensByName(TokenName.ThinIce);
  square.addToken({
    name: TokenName.ThinIce,
    data: { thinIceData: (currentToken?.data?.thinIceData ?? STEPS_TO_BREAK) - 1 },
    expired: () => false,
  });
}
