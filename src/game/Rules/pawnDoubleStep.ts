import { Gait, PieceName, TokenName } from "../types";
import { Piece } from "../Board";
import { Rule } from "./Rules";
import { pawnDoubleStepToken } from "./constants";
import { isPresent } from "utilities";

export const pawnDoubleStep: Rule = {
  name: "Pawn Double Step",
  description:
    "For their first move, pawns can do two steps in their direction of travel!",
  postMove: ({ board, move, currentTurn }) => {
    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pId])
      .filter(isPresent);
    piecesMoved.forEach((piece: Piece) => {
      if (piece?.name === PieceName.Pawn)
        piece.removeTokensByName(TokenName.PawnDoubleStep);
    });
    return { board, move, currentTurn };
  },
  onGaitsGeneratedModify: ({ gaits, piece }) => ({
    gaits: [
      ...gaits,
      ...(piece.hasTokenWithName(TokenName.PawnDoubleStep)
        ? gaits.filter((g) => g.mustNotCapture).map(doubleStep)
        : []),
    ],
    piece,
  }),
  afterBoardCreation: ({ board }) => {
    board.addPieceTokensByRule((piece: Piece) =>
      piece.name === PieceName.Pawn ? [pawnDoubleStepToken] : []
    );
    return { board };
  },
};

const doubleStep = (originalGait: Gait): Gait => ({
  ...originalGait,
  pattern: [...originalGait.pattern, ...originalGait.pattern],
  data: {
    interceptable: true,
    interceptionCondition: (piece: Piece): boolean => {
      return piece.name === PieceName.Pawn;
    },
  },
});
