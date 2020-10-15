import { PieceName, Player, TokenName } from "../types";
import { Piece } from "../Board";
import { Rule } from "./Rules";
import { hexGaits, pawnDoubleStepToken } from "./constants";
import { isPresent } from "utilities";

export const HexPawnDoubleStep: Rule = {
  name: "Pawn Double Step",
  description:
    "For their first move, pawns can do two steps in their direction of travel!",
  postMove: ({ board, move, currentTurn }) => {
    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pId])
      .filter(isPresent);
    piecesMoved.forEach((piece: Piece) => {
      if (piece.name === PieceName.Pawn)
        piece.removeTokensByName(TokenName.PawnDoubleStep);
    });
    return { board, move, currentTurn };
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
