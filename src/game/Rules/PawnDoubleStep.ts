import { PieceName, Player, Rule, Token, TokenName } from "../types";
import { Piece } from "../Board";
import { standardGaits } from "./constants";

export const PawnDoubleStep: Rule = {
  postMove: ({ piecesMoved }) => {
    piecesMoved.forEach((piece: Piece) => {
      if (piece.name === PieceName.Pawn)
        piece.removeTokensByName(TokenName.PawnDoubleStep);
    });
  },
  onGaitsGeneratedModify: ({ gaits, piece }) => ({
    gaits: [
      ...gaits,
      ...(piece.hasTokenWithName(TokenName.PawnDoubleStep)
        ? piece.owner === Player.White
          ? standardGaits.WHITE_PAWN_DS_GAITS
          : standardGaits.BLACK_PAWN_DS_GAITS
        : []),
    ],
    piece,
  }),
  onPieceGeneratedModify: ({ piece }) => {
    piece.addToken(pawnDoubleStepToken);
    return { piece };
  },
  onBoardCreatedModify: ({ board }) => {
    board.addPieceTokensByRule((piece: Piece) =>
      piece.name === PieceName.Pawn ? [pawnDoubleStepToken] : []
    );
    return { board };
  },
};

const pawnDoubleStepToken: Token = {
  name: TokenName.PawnDoubleStep,
  validTo: undefined,
  data: undefined,
};
