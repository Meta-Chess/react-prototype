import { TokenName } from "../types";
import { Piece } from "../Board";
import { Rule } from "./Rules";

export const Fatigue: Rule = {
  postMove: ({ move, currentTurn }) => {
    const piecesMoved = move.pieceDeltas.map((delta) => delta.piece);
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
    return { move, currentTurn };
  },
  onGaitsGeneratedModify: ({ piece, gaits }) =>
    piece.hasTokenWithName(TokenName.Fatigue)
      ? {
          gaits: [],
          piece,
        }
      : { piece, gaits },
};
