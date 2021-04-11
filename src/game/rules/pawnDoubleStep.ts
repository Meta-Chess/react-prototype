import { Gait, PieceName, TokenName } from "../types";
import { Piece } from "../Board";
import {
  Rule,
  ParameterRule,
  PostMove,
  OnGaitsGeneratedModify,
  AfterBoardCreation,
} from "./CompactRules";
import { pawnDoubleStepToken } from "./constants";
import { isPresent } from "utilities";

export const pawnDoubleStep: ParameterRule = (): Rule => {
  return {
    title: "Pawn Double Step",
    description:
      "For their first move, pawns can do two steps in their direction of travel!",
    postMove: ({ game, interrupt, board, move, currentTurn }): PostMove => {
      const piecesMoved = move.pieceDeltas
        .map((delta) => board.pieces[delta.pieceId])
        .filter(isPresent);
      piecesMoved.forEach((piece: Piece) => {
        if (piece?.name === PieceName.Pawn)
          piece.removeTokensByName(TokenName.PawnDoubleStep);
      });
      return { game, interrupt, board, move, currentTurn };
    },
    onGaitsGeneratedModify: ({ gaits, piece }): OnGaitsGeneratedModify => ({
      gaits: [
        ...gaits,
        ...(piece.hasTokenWithName(TokenName.PawnDoubleStep)
          ? gaits.filter((g) => g.mustNotCapture).map(doubleStep(piece))
          : []),
      ],
      piece,
    }),
    afterBoardCreation: ({ board }): AfterBoardCreation => {
      board.addPieceTokensByRule((piece: Piece) =>
        piece.name === PieceName.Pawn ? [pawnDoubleStepToken] : []
      );
      return { board };
    },
  };
};

function doubleStep(originalPiece: Piece): (originalGait: Gait) => Gait {
  const originalOwner = originalPiece.owner;
  return (originalGait: Gait): Gait => ({
    ...originalGait,
    pattern: [...originalGait.pattern, ...originalGait.pattern],
    data: {
      interceptable: true,
      interceptionCondition: (piece: Piece): boolean => {
        return piece.name === PieceName.Pawn && piece.owner !== originalOwner;
      },
    },
  });
}
