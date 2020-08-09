import { PieceType, Variant } from "../types";
import { Piece } from "../Board";

export const PawnDoubleStep: Variant = {
  postMove: ({ piecesMoved }) => {
    piecesMoved.forEach((piece: Piece) => {
      if (piece.type === PieceType.Pawn) piece.attributes.doubleStep = false;
    });
  },
};
