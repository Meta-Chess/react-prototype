import { PieceType, Player, Variant, Token, TokenName } from "../types";
import { Piece } from "../Board";
import * as defaultGaits from "../Board/Piece";

export const PawnDoubleStep: Variant = {
  postMove: ({ piecesMoved }) => {
    piecesMoved.forEach((piece: Piece) => {
      if (piece.type === PieceType.Pawn)
        piece.removeTokensByName(TokenName.PawnDoubleStep);
    });
  },
  onGaitsGeneratedModify: ({ gaits, piece }) => ({
    gaits: [
      ...gaits,
      ...(piece.hasTokenWithName(TokenName.PawnDoubleStep)
        ? piece.owner === Player.White
          ? defaultGaits.WHITE_PAWN_DS_GAITS
          : defaultGaits.BLACK_PAWN_DS_GAITS
        : []),
    ],
    piece,
  }),
  onPieceGeneratedModify: ({ piece }) => {
    piece.addToken(pawnDoubleStepToken);
    return { piece };
  },
  // TODO: On piece generation, set pawnDoubleStep = true
  //this is a trivial change
};

const pawnDoubleStepToken: Token = {
  name: TokenName.PawnDoubleStep,
  validTo: undefined,
  data: undefined,
};
