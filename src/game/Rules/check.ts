import { CompactRules, Rule } from "./Rules";
import { Pather } from "../Pather";
import { cloneDeep } from "lodash";
import { Game, Move } from "game";

export const check: Rule = {
  name: "Check",
  description:
    "You can't do any moves that would allow an opponent to take your king on their next turn. Something something win condition? Something something multiple opponents?",
  inCanStayFilter: (input) => {
    if (input.filtered) return input;
    return { ...input, filtered: !checkAllowsMove(input) };
  },
  lossCondition: ({ playerName, game, gameClones, interrupt, dead }) => {
    if (dead || game.getCurrentPlayerName() !== playerName)
      return { playerName, game, gameClones, interrupt, dead };
    if (checkAllowsMove({ move: undefined, game, gameClones, interrupt }))
      return { playerName, game, gameClones, interrupt, dead: false };

    const pieces = game.board.piecesBelongingTo(playerName);
    for (let i = 0; i < pieces.length; i++) {
      const pather = new Pather(game, gameClones, pieces[i], interrupt);
      const hypotheticalMoves = pather.findPaths();
      if (hypotheticalMoves.length > 0)
        return { playerName, game, gameClones, interrupt, dead: false };
    }
    return { playerName, game, gameClones, interrupt, dead: "checkmated" };
  },
};

function checkAllowsMove({
  move,
  game,
  gameClones,
  interrupt,
  patherParams = {},
}: {
  move: Move | undefined;
  game: Game;
  gameClones: Game[];
  interrupt: CompactRules;
  patherParams?: { checkDepth?: number };
}): boolean {
  const newPatherParams = cloneDeep(patherParams);

  if (newPatherParams.checkDepth === undefined) {
    newPatherParams.checkDepth = 1;
  }

  if (newPatherParams.checkDepth > 0) {
    const player =
      move?.playerName === undefined ? game.getCurrentPlayerName() : move?.playerName;
    newPatherParams.checkDepth -= 1;
    gameClones[0].resetTo(game);
    gameClones[0].doMove(move);
    gameClones[0].nextTurn();
    const pieces = gameClones[0].board.piecesNotBelongingTo(player);

    for (let i = 0; i < pieces.length; i++) {
      const piece = pieces[i];
      const pather = new Pather(gameClones[0], [], piece, interrupt, newPatherParams);
      const hypotheticalMoves = pather.findPaths();

      for (let j = 0; j < hypotheticalMoves.length; j++) {
        gameClones[1].resetTo(gameClones[0]);
        gameClones[1].doMove(hypotheticalMoves[j]);
        gameClones[1].nextTurn();
        const { dead } = interrupt.for.lethalCondition({
          board: gameClones[1].board,
          player: player,
          dead: false,
        });
        if (dead) {
          return false;
        }
      }
    }
  }
  return true;
}
