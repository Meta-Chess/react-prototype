import { Board, Square } from "game/Board";
import { TokenName } from "game/types";
import { PieceDelta } from "game/Move";
import { Rule, ParameterRule, OnPieceDisplaced } from "../CompactRules";

const STEPS_TO_BREAK = 2;

export const thinIce: ParameterRule = (): Rule => {
  return {
    title: "Thin Ice",
    description:
      "You're skating on thin ice! When a square is moved to multiple times it breaks.",

    onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
      const landingSquare = board.squareAt(pieceDelta.path.getEnd());

      incrementThinIceToken(landingSquare);

      const stepsOnSquare = getStepsOnSquare(landingSquare);

      if (squareShouldBreak(stepsOnSquare)) breakSquare(board, pieceDelta);

      return { board, pieceDelta };
    },
  };
};

function breakSquare(board: Board, pieceDelta: PieceDelta): void {
  board.killPiecesAt({ piecesLocation: pieceDelta.path.getEnd() });
  delete board.squares[pieceDelta.path.getEnd()];
}

function squareShouldBreak(stepsOnSquare: number): boolean {
  return stepsOnSquare >= STEPS_TO_BREAK;
}

function getStepsOnSquare(landingSquare: Square | undefined): number {
  return landingSquare?.firstTokenWithName(TokenName.ThinIce)?.data?.thinIceData || 0;
}

function incrementThinIceToken(square?: Square): void {
  if (!square) return;
  const currentToken = square.firstTokenWithName(TokenName.ThinIce);
  if (!currentToken?.data?.thinIceData) {
    square.addToken({
      name: TokenName.ThinIce,
      data: { thinIceData: 1 },
      expired: () => false,
    });
    return;
  }
  currentToken.data.thinIceData += 1;
}
