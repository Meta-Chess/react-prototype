import { Direction } from "../types";
import { Rule } from "./CompactRules";
import { Board } from "game";
import { Gait, PlayerName } from "game/types/types";
import { Move, PieceDelta } from "game/Move";
import { Square } from "game/Board";
import { rotate180 } from "./utilities";
import { clone } from "lodash";
import { Path } from "game/Pather";

const MAX_CHAIN_LENGTH = 5;
const FORCE_PULL = true;

export const pull: Rule = {
  title: "Pull",
  description: `When moving linearly a piece ${
    FORCE_PULL ? "must" : "may"
  } pull adjacent (behind) allied pieces along with it. Max chain: ${MAX_CHAIN_LENGTH} pieces. Pull moves are calculated based off the lead piece's allowable moves if pull was off.`,

  onGaitsGeneratedModify: ({ gaits, piece }) => {
    gaits.filter(isLinear).forEach(addLinearMoverToGaitData);
    return { gaits, piece };
  },

  //Note: a more rigorous implementation would probably interrupt during pathing not after to allow chains of pieces to not self interfere.
  processMoves: ({ moves, board }) => {
    const processedMoves = moves.flatMap((move) => {
      if (
        move.data?.linearMover !== undefined &&
        allPiecesLeaveStartSquare(move, board)
      ) {
        const forward = move.data.linearMover;
        const backward = rotate180([move.data.linearMover])[0];
        const startSquare = board.squareAt(move.pieceDeltas[0].path.getStart());
        if (!startSquare) return [move];
        const theSquares: Square[] = [startSquare];

        for (let i = 1; i < MAX_CHAIN_LENGTH; i++) {
          const newSquare = board.squareAt(theSquares[i - 1]?.go(backward)[0]);
          if (
            !newSquare ||
            !squareBehindHasOnlyFriendlyPieces(
              theSquares[i - 1],
              newSquare,
              move.playerName,
              forward,
              board
            )
          ) {
            break;
          }

          theSquares[i] = newSquare;
        }

        const extendedPath = [
          ...[...theSquares].reverse().map((s) => s.location),
          ...move.pieceDeltas[0].path.getPath().slice(1),
        ];

        const moves = [move];
        for (let i = 1; i < theSquares.length; i++) {
          const newDeltas = theSquares[i].pieces.map((pieceId) => {
            const delta: PieceDelta = {
              pieceId: pieceId,
              path: new Path(
                theSquares[i].location,
                extendedPath.slice(theSquares.length - i, extendedPath.length - i)
              ),
            };
            return delta;
          });

          const newMove = clone(move);
          newMove.pieceDeltas = [...clone(moves[i - 1].pieceDeltas), ...newDeltas];
          moves.push(newMove);
        }
        return FORCE_PULL ? moves[moves.length - 1] : moves;
      }
      return [move];
    });
    return { moves: processedMoves, board };
  },
};

function isLinear(gait: Gait): boolean {
  return !gait.pattern.some((direction) => direction !== gait.pattern[0]);
}

function addLinearMoverToGaitData(gait: Gait): void {
  if (gait.data === undefined) gait.data = {};
  gait.data.linearMover = gait.pattern[0];
}

function squareBehindHasOnlyFriendlyPieces(
  thisSquare: Square,
  squareBehind: Square,
  team: PlayerName,
  forward: Direction,
  board: Board
): boolean {
  return (
    squareBehind.pieces.length > 0 &&
    squareBehind.pieces.every((pieceId) => board.getPiece(pieceId)?.owner === team) &&
    squareBehind.go(forward).some((s) => s === thisSquare?.location)
  );
}

function allPiecesLeaveStartSquare(move: Move, board: Board): boolean {
  return move.pieceDeltas.every((pieceDelta) =>
    board
      .getPiecesAt(move.pieceDeltas[0].path.getStart())
      .some((p) => p.id === pieceDelta.pieceId)
  );
}
