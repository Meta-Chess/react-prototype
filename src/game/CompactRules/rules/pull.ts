import { Direction } from "game/types";
import {
  Rule,
  ParameterRule,
  OnGaitsGeneratedModify,
  ProcessMoves,
} from "../CompactRules";
import { Board } from "game";
import { Gait, PlayerName } from "game/types/types";
import { Move, PieceDelta } from "game/Move";
import { Square } from "game/Board";
import { rotate180, getDefaultParams } from "../utilities";
import { cloneDeep } from "lodash";
import { Path } from "game/Pather";

const MAX_CHAIN_LENGTH = 5;

export const pull: ParameterRule = (
  ruleParams = getDefaultParams("pullSettings")
): Rule => {
  return {
    title: "Pull",
    description: `When moving linearly a piece ${
      ruleParams["Forced Pull"] ? "must" : "may"
    } pull allied pieces along with it. Max chain length: ${MAX_CHAIN_LENGTH} pieces. Pull moves are calculated based on the way the lead piece would move if Pull was not enabled.`,

    onGaitsGeneratedModify: ({ gaits, piece }): OnGaitsGeneratedModify => {
      gaits.filter(isLinear).forEach(addLinearMoverToGaitData);
      return { gaits, piece };
    },

    //Note: a more rigorous implementation would probably interrupt during pathing not after to allow chains of pieces to not self interfere.
    processMoves: ({ moves, game, gameClones, params }): ProcessMoves => {
      const board = game.board;
      const processedMoves = moves.flatMap((move) => {
        if (
          move.data?.linearMoverDirection !== undefined &&
          allPiecesOnStartSquareLeave(move, board)
        ) {
          const forwards = move.data.linearMoverDirection;
          const backwards = rotate180([forwards])[0];
          const startSquare = board.squareAt(move.pieceDeltas[0]?.path.getStart());
          if (!startSquare) return move;

          const tail: Square[] = calculateTail(
            startSquare,
            board,
            backwards,
            forwards,
            move
          );

          const extendedPath = [
            ...[...tail].reverse().map((s) => s.location),
            ...move.pieceDeltas[0].path.getPath().slice(1),
          ];

          const moves = [move];
          for (let i = 1; i < tail.length; i++) {
            const newDeltas = tail[i].pieces.map(
              (pieceId): PieceDelta => ({
                pieceId: pieceId,
                path: new Path(
                  tail[i].location,
                  extendedPath.slice(tail.length - i, extendedPath.length - i)
                ),
              })
            );

            const newMove = cloneDeep(move);
            newMove.pieceDeltas = [...cloneDeep(moves[i - 1].pieceDeltas), ...newDeltas];

            moves.push(newMove);
          }
          return ruleParams["Forced Pull"] ? moves[moves.length - 1] : moves;
        }
        return move;
      });
      return { moves: processedMoves, game, gameClones, params };
    },
  };
};

function isLinear(gait: Gait): boolean {
  return !gait.pattern.some((direction) => direction !== gait.pattern[0]);
}

function addLinearMoverToGaitData(gait: Gait): void {
  if (gait.data === undefined) gait.data = {};
  gait.data.linearMoverDirection = gait.pattern[0];
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

function allPiecesOnStartSquareLeave(move: Move, board: Board): boolean {
  return move.pieceDeltas.every((pieceDelta) =>
    board
      .getPiecesAt(move.pieceDeltas[0].path.getStart())
      .some((p) => p.id === pieceDelta.pieceId)
  );
}

function calculateTail(
  startSquare: Square,
  board: Board,
  backwards: Direction,
  forwards: Direction,
  move: Move
): Square[] {
  const tail: Square[] = [startSquare];

  for (let i = 1; i < MAX_CHAIN_LENGTH; i++) {
    const newSquare = board.squareAt(tail[i - 1]?.go(backwards)[0]);
    if (
      !newSquare ||
      !squareBehindHasOnlyFriendlyPieces(
        tail[i - 1],
        newSquare,
        move.playerName,
        forwards,
        board
      )
    ) {
      break;
    }

    tail[i] = newSquare;
  }

  return tail;
}
