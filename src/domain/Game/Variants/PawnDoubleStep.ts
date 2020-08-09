import { PieceType, Player, Variant } from "../types";
import { Piece } from "../Board";
import * as defaultGaits from "../Board/Piece";

export const PawnDoubleStep: Variant = {
  postMove: ({ piecesMoved }) => {
    piecesMoved.forEach((piece: Piece) => {
      if (piece.type === PieceType.Pawn) piece.attributes.pawnDoubleStep = false;
    });
  },
  onGaitGenerate: ({ gaits, piece }) => ({
    gaits: [
      ...gaits,
      ...(piece.attributes?.pawnDoubleStep
        ? piece.owner === Player.White
          ? defaultGaits.WHITE_PAWN_DS_GAITS
          : defaultGaits.BLACK_PAWN_DS_GAITS
        : []),
    ],
    piece,
  }),
  // TODO: On piece generation, set pawnDoubleStep = true
};
