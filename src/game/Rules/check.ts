import { Rule } from "./Rules";
import { Pather } from "../Pather";
import { cloneDeep } from "lodash";

export const check: Rule = {
  name: "Check",
  description:
    "You can't do any moves that would allow an opponent to take your king on their next turn. Something something win condition? Something something multiple opponents?",

  inCanStayFilter: ({ move, game, gameClones, interrupt, patherParams, filtered }) => {
    if (filtered) return { move, game, gameClones, interrupt, patherParams, filtered };

    const newPatherParams = cloneDeep(patherParams);

    if (newPatherParams.checkDepth === undefined) {
      newPatherParams.checkDepth = 1;
    }

    if (newPatherParams.checkDepth > 0) {
      newPatherParams.checkDepth -= 1;
      gameClones[0].doMove(move);
      const pieces = gameClones[0].board.piecesNotBelongingTo(move.player);

      gameClones[1].resetTo(gameClones[0]);
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const pather = new Pather(gameClones[0], [], piece, interrupt, newPatherParams);
        const hypotheticalMoves = pather.findPaths();
        for (let j = 0; j < hypotheticalMoves.length; j++) {
          gameClones[1].doMove(hypotheticalMoves[j]);
          const { dead } = interrupt.for.lethalCondition({
            board: gameClones[1].board,
            player: move.player,
            dead: false,
          });
          if (dead) {
            gameClones[0].resetTo(game);
            return { move, game, gameClones, interrupt, patherParams, filtered: true };
          }
          gameClones[1].resetTo(gameClones[0]);
        }
      }
      gameClones[0].resetTo(game);
    }
    return { move, game, gameClones, interrupt, patherParams, filtered: false };
  },
};
