import { CompactRules, Rule } from "./CompactRules";
import { Pather } from "../Pather";
import { Game, Move } from "game";
import { PieceName } from "game/types";
import { doesCapture } from "./utilities";

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

  return gameClones[0].board
    .getPieces()
    .filter((piece) => piece.name === PieceName.Knight)
    .some((knight) => {
      const moves = new Pather(gameClones[0], [], knight, interrupt, {
        checkDepth: 0,
        noForkSearch: false,
        chainReactionSearch: false,
      }).findPaths();
      return moves.filter(doesCapture).length > 1;
    });
}
