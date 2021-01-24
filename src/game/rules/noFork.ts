import { CompactRules, Rule } from "./CompactRules";
import { Pather } from "../Pather";
import { Game, Move } from "game";
import { PieceName } from "game/types";

export const noFork: Rule = {
  title: "No Fork",
  description: "Moves that allow knights to attack multiple enemy pieces are restricted.",
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

  let fork = false;
  Object.values(pieces)
    .filter((piece) => piece.name === PieceName.Knight)
    .some((knight) => {
      const moves = new Pather(gameClones[0], [], knight, interrupt, {
        checkDepth: 0,
        noForkSearch: false,
      }).findPaths();
      if (
        moves.filter(
          (m) =>
            m.pieceDeltas.filter(
              (delta) =>
                gameClones[0].board
                  .getPiecesAt(delta.path.getEnd())
                  .filter((p) => p.owner !== knight.owner).length > 0
            ).length > 0
        ).length > 1 // more than 1 enemy piece captures possible
      ) {
        fork = true;
        return true;
      }
    });

  return fork;
}
