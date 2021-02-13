import { CompactRules, Rule } from "./CompactRules";
import { Pather } from "../Pather";
import { cloneDeep } from "lodash";
import { Game, Move } from "game";
import { hasLegalMoves } from "./utilities";

export const check: Rule = {
  title: "Check",
  description:
    "You can't do any moves that would allow an opponent to take your king on their next turn. Something something win condition? Something something multiple opponents?",
  inPostMoveGenerationFilter: (input) => {
    if (input.filtered) return input;
    return { ...input, filtered: !checkAllowsMove(input) };
  },
  lossCondition: ({ playerName, game, gameClones, interrupt, dead }) => {
    if (dead || game.getCurrentPlayerName() !== playerName)
      return { playerName, game, gameClones, interrupt, dead };

    if (!inCheck(game, gameClones, interrupt))
      return { playerName, game, gameClones, interrupt, dead: false };

    game.events.notify({ name: "check", data: { playerName, game } });

    if (hasLegalMoves(playerName, game, gameClones, interrupt))
      return { playerName, game, gameClones, interrupt, dead: false };

    return { playerName, game, gameClones, interrupt, dead: "checkmated" };
  },
};

function inCheck(game: Game, gameClones: Game[], interrupt: CompactRules): boolean {
  return !checkAllowsMove({ move: undefined, game, gameClones, interrupt });
}

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
    const alivePlayerNames = game.alivePlayers().map((player) => player.name);
    const pieces = gameClones[0].board
      .piecesNotBelongingTo(player)
      .filter((piece) => alivePlayerNames.includes(piece.owner));

    for (let i = 0; i < pieces.length; i++) {
      const piece = pieces[i];
      const pather = new Pather(
        gameClones[0],
        gameClones.slice(1),
        piece,
        interrupt,
        newPatherParams
      );
      const hypotheticalMoves = pather.findPaths({ filterPacifistMoves: true });

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
