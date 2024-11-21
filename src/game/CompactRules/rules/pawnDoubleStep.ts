import { Gait, PieceName, TokenName } from "game/types";
import { Piece } from "game/Board";
import {
  AfterBoardCreation,
  OnGaitsGeneratedModify,
  PostMove,
  TrivialParameterRule,
} from "../CompactRules";
import { pawnDoubleStepToken } from "../constants";
import { isPresent } from "utilities";
import { InterceptionConditionType } from "game/types/InterceptionCondition";

export const pawnDoubleStep: TrivialParameterRule = () => ({
  title: "Pawn Double Step",
  description:
    "For their first move, pawns can do two steps in their direction of travel!",
  postMove: ({ game, interrupt, board, move, currentTurn }): PostMove => {
    if (!move) return { game, interrupt, board, move, currentTurn };

    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pieceId])
      .filter(isPresent);
    piecesMoved.forEach((piece: Piece) => {
      if (piece?.name === PieceName.Pawn)
        piece.removeTokensByName(TokenName.PawnDoubleStep);
    });
    return { game, interrupt, board, move, currentTurn };
  },
  onGaitsGeneratedModify: ({ game, gaits, piece }): OnGaitsGeneratedModify => ({
    game,
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
});

function doubleStep(originalPiece: Piece): (originalGait: Gait) => Gait {
  const originalOwner = originalPiece.owner;
  return (originalGait: Gait): Gait => ({
    ...originalGait,
    pattern: [...originalGait.pattern, ...originalGait.pattern],
    data: {
      interceptable: true,
      interceptionConditionType: InterceptionConditionType.PawnDoubleStep,
      interceptionConditionBuilderParams: { originalOwner },
    },
  });
}
