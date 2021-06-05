import { PieceName } from "game/types";
import { Rule, ParameterRule, ProcessMoves, OnPieceDisplaced } from "../CompactRules";
import { Board } from "game";
import { nthCartesianPower } from "utilities/nthCartesianPower";
import { Gait } from "game/types/types";
import { Move, PieceDelta } from "game/Move";
import { cloneDeep } from "lodash";

const PROMOTION_PIECES = [
  PieceName.Queen,
  PieceName.Rook,
  PieceName.Knight,
  PieceName.Bishop,
];

export const promotion: ParameterRule = (): Rule => {
  return {
    title: "Promotion",
    description:
      "When pawns reach a promotion square, they can be turned into a queen, knight, rook, or bishop",

    processMoves: ({ moves, game, gameClones, params }): ProcessMoves => {
      const board = game.board;
      const processedMoves = moves.flatMap((move) => {
        const [promotionDeltas, nonPromotionDeltas] = partitionDeltas(move, board);
        if (promotionDeltas.length !== 0) {
          return nthCartesianPower(PROMOTION_PIECES, promotionDeltas.length).map(
            (promotions) => {
              return {
                ...cloneDeep(move),
                pieceDeltas: [
                  ...promotionDeltas.map((delta, index) => ({
                    ...cloneDeep(delta),
                    promoteTo: promotions[index],
                  })),
                  ...cloneDeep(nonPromotionDeltas),
                ],
              };
            }
          );
        } else {
          return [move];
        }
      });
      return { moves: processedMoves, game, gameClones, params };
    },

    // onPieceDisplaced can be moved into a lower level utility rule when we make other rules to handle other kinds of promotion
    onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
      if (pieceDelta.promoteTo !== undefined) {
        const piece = board.getPiece(pieceDelta.pieceId);
        if (piece) {
          piece.name = pieceDelta.promoteTo;
          piece.generateGaits =
            board.interrupt.for.getGaitGenerator({
              name: pieceDelta.promoteTo,
            }).gaitGenerator || ((): Gait[] => []);
        }
      }
      return { board, pieceDelta };
    },
  };
};

function partitionDeltas(move: Move, board: Board): [PieceDelta[], PieceDelta[]] {
  return move.pieceDeltas.reduce(
    (results, delta) => {
      const shouldPromote =
        board.getPiece(delta.pieceId)?.name === PieceName.Pawn &&
        board
          .getRegion("promotion", board.getPiece(delta.pieceId)?.owner)
          .some((s) => s.location === delta.path.getEnd()) &&
        delta.promoteTo === undefined;
      results[shouldPromote ? 0 : 1].push(delta);
      return results;
    },
    [[], []] as [PieceDelta[], PieceDelta[]]
  );
}
