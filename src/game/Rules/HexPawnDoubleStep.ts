import { PieceName, Player, TokenName } from "../types";
import { Piece } from "../Board";
import { Rule } from "./Rules";
import { hexGaits, pawnDoubleStepToken } from "./constants";

export const HexPawnDoubleStep: Rule = {
  postMove: ({ move }) => {
    const piecesMoved = move.pieceDeltas.map((delta) => delta.piece);
    piecesMoved.forEach((piece: Piece) => {
      if (piece.name === PieceName.Pawn)
        piece.removeTokensByName(TokenName.PawnDoubleStep);
    });
    return { move };
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
  onBoardCreatedModify: ({ board }) => {
    board.addPieceTokensByRule((piece: Piece) =>
      piece.name === PieceName.Pawn ? [pawnDoubleStepToken] : []
    );
    return { board };
  },
};
