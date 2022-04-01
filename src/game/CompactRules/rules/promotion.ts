import { PieceName } from "game/types";
import { ProcessMoves, OnPieceDisplaced } from "../CompactRules";
import { Board, ParameterRule } from "game";
import { nthCartesianPower } from "utilities/nthCartesianPower";
import { Gait } from "game/types/types";
import { Move, PieceDelta } from "game/Move";
import { cloneDeep } from "lodash";
import { PieceStatus } from "game/Board/PieceStatus";

export const promotion: ParameterRule<"promotion"> = ({
  "Promotion Pieces": paramPromotionPieces,
  "Only Friendly Dead Pieces": onlyFriendlyDeadPieces,
  "Non Promotion Moves": nonPromotionMoves,
}) => ({
  title: "Promotion",
  description:
    "When pawns reach a promotion square, they can be turned into a queen, knight, rook, or bishop",

  processMoves: ({ moves, game, gameClones, params }): ProcessMoves => {
    let promotionPieces = paramPromotionPieces[0];
    if (onlyFriendlyDeadPieces) {
      const deadPieces = game.board
        .getPieces([PieceStatus.Dead])
        .filter((piece) => piece.owner === game.currentPlayerIndex)
        .map((piece) => piece.name);

      promotionPieces = promotionPieces.filter((pieceName) =>
        deadPieces.includes(pieceName)
      );
    }

    const board = game.board;
    const processedMoves = moves.flatMap((move) => {
      const [promotionDeltas, nonPromotionDeltas] = partitionDeltas(move, board);
      if (promotionDeltas.length !== 0) {
        return nthCartesianPower(promotionPieces, promotionDeltas.length).map(
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
    const finalMoves = nonPromotionMoves
      ? [...moves, ...processedMoves]
      : [...processedMoves];
    return { moves: finalMoves, game, gameClones, params };
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
});

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
