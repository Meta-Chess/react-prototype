import { Rule } from "./Rules";
import { Pather } from "../Pather";
import { cloneDeep } from "lodash";

export const Check: Rule = {
  name: "Check",
  description:
    "You can't do any moves that would allow an opponent to take your king on their next turn. Something something win condition? Something something multiple opponents?",

  inCanStayFilter: ({ move, game, gameClones, interrupt, patherParams, filtered }) => {
    const newPatherParams = cloneDeep(patherParams);
    const gameClone = gameClones[0];
    const secondClonedGame = gameClones[1];

    if (newPatherParams.checkDepth === undefined) {
      newPatherParams.checkDepth = 1;
    }

    if (newPatherParams.checkDepth > 0 && filtered !== true) {
      newPatherParams.checkDepth -= 1;
      gameClone.doMove(move);
      const pieces = gameClone.board.piecesNotBelongingTo(move.player);

      secondClonedGame.resetTo(gameClone);
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const pather = new Pather(
          gameClone,
          [gameClones[0]],
          piece,
          interrupt,
          newPatherParams
        );
        const hypotheticalMoves = pather.findPaths();
        for (let j = 0; j < hypotheticalMoves.length; j++) {
          secondClonedGame.doMove(hypotheticalMoves[j]);
          const { dead } = interrupt.for.lethalCondition({
            board: secondClonedGame.board,
            player: move.player,
            dead: false,
          });
          if (dead) {
            gameClones[0].resetTo(game);
            return { move, game, gameClones, interrupt, patherParams, filtered: true };
          }
          secondClonedGame.resetTo(gameClone);
        }
      }
    }
    gameClones[0].resetTo(game);
    return { move, game, gameClones, interrupt, patherParams, filtered };
  },
};
