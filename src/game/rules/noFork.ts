import { CompactRules, Rule } from "./CompactRules";
import { Pather } from "../Pather";
import { Game, Move } from "game";
import { Piece } from "game/Board";
import { PieceName } from "game/types";

export const noFork: Rule = {
  title: "No Fork",
  description:
    "No moves are allowed which result in knights attacking more than 1 enemy piece.",
  inPostMoveGenerationFilter: (input) => {
    if (input.filtered) return input;
    return { ...input, filtered: isThereAnyKnightFork(input) };
  },
};

function isThereAnyKnightFork({
  move,
  game,
  gameClones,
  interrupt,
  patherParams = { noForkSearch: true },
}: {
  move: Move | undefined;
  game: Game;
  gameClones: Game[];
  interrupt: CompactRules;
  patherParams: { noForkSearch?: boolean };
}): boolean {
  if (patherParams.noForkSearch === false && patherParams.noForkSearch !== undefined)
    return false;

  gameClones[0].resetTo(game);
  gameClones[0].doMove(move);
  gameClones[0].nextTurn();
  const pieces = gameClones[0].board.pieces;

  return Object.values(pieces)
    .filter((piece) => piece.name === PieceName.Knight)
    .some((knight) => {
      const moves = new Pather(gameClones[0], [], knight, interrupt, {
        checkDepth: 0,
        noForkSearch: false,
      }).findPaths();
      return moves.filter(doesCapture(gameClones[0], knight)).length > 1;
    });
}

const doesCapture = (gameClone: Game, piece: Piece) => (move: Move): boolean => {
  return move.pieceDeltas.some((delta) =>
    gameClone.board.getPiecesAt(delta.path.getEnd()).some((p) => p.owner !== piece.owner)
  );
};
