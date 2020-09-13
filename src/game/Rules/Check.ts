import { Rule } from "./Rules";
import { Pather } from "../Pather";
import { cloneDeep } from "lodash";

export const Check: Rule = {
  name: "Check",
  description:
    "You can't do any moves that would allow an opponent to take your king on their next turn. Something something win condition? Something something multiple opponents?",

  inCanStayFilter: ({ move, game, gameClone, interrupt, patherParams, filtered }) => {
    const newPatherParams = cloneDeep(patherParams);
    if (newPatherParams.checkDepth === undefined) {
      newPatherParams.checkDepth = 1;
    }

    if (newPatherParams.checkDepth > 0 && filtered !== true) {
      newPatherParams.checkDepth -= 1;
      gameClone.doMove(move);
      const pieces = gameClone.board.piecesNotBelongingTo(move.player);

      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const pather = new Pather(gameClone, piece, interrupt, newPatherParams);
        const hypotheticalMoves = pather.findPaths();
        const secondClonedGame = gameClone.clone();
        for (let j = 0; j < hypotheticalMoves.length; j++) {
          secondClonedGame.doMove(hypotheticalMoves[j]);
          const { dead } = interrupt.for.lethalCondition({
            board: secondClonedGame.board,
            player: move.player,
            dead: false,
          });
          if (dead) {
            gameClone.resetTo(game);
            return { move, game, gameClone, interrupt, patherParams, filtered: true };
          }
          secondClonedGame.resetTo(gameClone);
        }
      }
    }
    gameClone.resetTo(game);
    return { move, game, gameClone, interrupt, patherParams, filtered };
  },
};
