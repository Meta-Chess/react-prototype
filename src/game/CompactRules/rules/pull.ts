import { Direction } from "game/types";
import {
  OnGaitsGeneratedModify,
  ParameterRule,
  ProcessMoves,
  Rule,
} from "../CompactRules";
import { Board } from "game";
import { Gait, PlayerName } from "game/types/types";
import { Move, PieceDelta } from "game/Move";
import { Square } from "game/Board";
import { rotate180 } from "../utilities";
import { cloneDeep, intersection } from "lodash";
import { Path } from "game/Pather";

const MAX_CHAIN_LENGTH = 5;

export const pull: ParameterRule<"pull"> = ({ "Forced Pull": forcePull }): Rule => {
  return {
    title: "Pull",
    description: `When moving linearly a piece ${
      forcePull ? "must" : "may"
    } pull allied pieces along with it. Max chain length: ${MAX_CHAIN_LENGTH} pieces. Pull moves are calculated based on the way the lead piece would move if Pull was not enabled.`,

    onGaitsGeneratedModify: ({ game, gaits, piece }): OnGaitsGeneratedModify => {
      gaits.filter(isLinear).forEach(addLinearMoverToGaitData);
      return { game, gaits, piece };
    },

    //Note: a more rigorous implementation would probably interrupt during pathing not after to allow chains of pieces to not self interfere.
    processMoves: ({ moves, game, gameClones, params }): ProcessMoves => {
      const board = game.board;
      const processedMoves = moves.flatMap((move) => {
        if (
          move.data?.linearMoverDirection !== undefined &&
          leadersPathIsClear(move, board)
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
          return forcePull ? moves[moves.length - 1] : moves;
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

function leadersPathIsClear(move: Move, board: Board): boolean {
  const leadersTrailingPath = move.pieceDeltas[0].path.getPath().slice(0, -1);
  const pathEnds = move.pieceDeltas.map((pd) => pd.path.getEnd());
  const piecesInMove = move.pieceDeltas.map((pd) => pd.pieceId);
  const piecesInPath = leadersTrailingPath
    .flatMap((location) => board.getPiecesAt(location))
    .map((p) => p.id);

  const piecesCurrentlyInPathWillMove =
    intersection(piecesInMove, piecesInPath).length === piecesInPath.length;
  const piecesWillNotMoveIntoPath =
    intersection(leadersTrailingPath, pathEnds).length === 0;
  return piecesCurrentlyInPathWillMove && piecesWillNotMoveIntoPath;
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
