import { PieceName, Rule, TokenName } from "../types";
import { Piece } from "../Board";
import { activeCastlingToken, passiveCastlingToken } from "./constants";

export const Castling: Rule = {
  postMove: ({ piecesMoved }) => {
    piecesMoved.forEach((piece: Piece) => {
      piece.removeTokensByNames([TokenName.ActiveCastling, TokenName.PassiveCastling]);
    });
  },
  onBoardCreatedModify: ({ board }) => {
    board.addPieceTokensByRule((piece: Piece) =>
      piece.name === PieceName.King
        ? [activeCastlingToken]
        : piece.name === PieceName.Rook
        ? [passiveCastlingToken]
        : []
    );
    return { board };
  },
};
