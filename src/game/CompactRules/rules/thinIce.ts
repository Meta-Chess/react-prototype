import { randomInt } from "utilities/random";
import { Rule, ParameterRule, OnPieceDisplaced } from "../CompactRules";

export const thinIce: ParameterRule = (): Rule => {
  return {
    title: "Thin Ice",
    description:
      "You're skating on thin ice! When a square is moved to multiple times it breaks.",

    onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
      if (randomInt(0, 1, true)) {
        board.killPiecesAt({ piecesLocation: pieceDelta.path.getEnd() });
        delete board.squares[pieceDelta.path.getEnd()];
      }
      return { board, pieceDelta };
    },
  };
};
