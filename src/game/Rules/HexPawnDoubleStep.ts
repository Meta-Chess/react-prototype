import { PieceName, Player, Rule, TokenName } from "../types";
import { Piece } from "../Board";
import { hexGaits, pawnDoubleStepToken } from "./constants";

export const HexPawnDoubleStep: Rule = {
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
          ? hexGaits.WHITE_PAWN_DS_GAITS
          : hexGaits.BLACK_PAWN_DS_GAITS
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
