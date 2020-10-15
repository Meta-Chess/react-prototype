import { TokenName } from "../types";
import { Piece } from "../Board";
import { Rule } from "./Rules";
import { isPresent } from "utilities";

export const Fatigue: Rule = {
  name: "Fatigue",
  description:
    "Moving is hard work! If you moved one of your pieces last turn, it's too tired to move this turn.",
  postMove: ({ board, move, currentTurn }) => {
    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pId])
      .filter(isPresent);
    piecesMoved.forEach((piece: Piece) => {
      const fatigueToken = {
        name: TokenName.Fatigue,
        expired: (turn: number): boolean => {
          return turn >= currentTurn + 2;
        },
        data: undefined,
      };
      piece.addToken(fatigueToken);
    });
    return { board, move, currentTurn };
  },
  onGaitsGeneratedModify: ({ piece, gaits }) =>
    piece.hasTokenWithName(TokenName.Fatigue)
      ? {
          gaits: [],
          piece,
        }
      : { piece, gaits },
};
