import { Rule } from "./Rules";
import { Pather } from "../Pather";
import { cloneDeep } from "lodash";

export const Check: Rule = {
  name: "Check",
  description:
    "You can't do any moves that would allow an opponent to take your king on their next turn. Something something win condition? Something something multiple opponents?",
  inCanStayFilter: ({ move, game, interrupt, patherParams, filtered }) => {
    const newPatherParams = cloneDeep(patherParams);
    if (newPatherParams.checkDepth === undefined) {
      newPatherParams.checkDepth = 1;
    }

    if (newPatherParams.checkDepth > 0) {
      newPatherParams.checkDepth -= 1;
      const cloneGame = game.clone();
      cloneGame.doMove(move);
      const pieces = cloneGame.board.piecesNotBelongingTo(move.player);

      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const pather = new Pather(cloneGame, piece, interrupt, newPatherParams);
        const hypotheticalMoves = pather.findPaths();
        for (let j = 0; j < hypotheticalMoves.length; j++) {
          const secondClonedGame = cloneGame.clone();
          secondClonedGame.doMove(hypotheticalMoves[j]);
          const { dead } = interrupt.for.lethalCondition({
            board: secondClonedGame.board,
            player: move.player,
            dead: false,
          });
          if (dead) {
            return { move, game, interrupt, patherParams, filtered: true };
          }
        }
      }
      return { move, game, interrupt, patherParams, filtered };
    } else {
      return { move, game, interrupt, patherParams, filtered };
    }
  },
};
