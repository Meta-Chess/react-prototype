import { Rule } from "./Rules";
import { Pather } from "../Pather";

export const stalemate: Rule = {
  name: "Stalemate",
  description: "If a player has no legal moves the game is declared a draw by stalemate.",

  drawCondition: ({ game, gameClones, interrupt, draw }) => {
    if (draw !== false) return { game, gameClones, interrupt, draw };

    const pieces = game.board.piecesBelongingTo(game.getCurrentPlayerName());
    for (let i = 0; i < pieces.length; i++) {
      const pather = new Pather(game, gameClones, pieces[i], interrupt);
      const hypotheticalMoves = pather.findPaths();
      if (hypotheticalMoves.length > 0)
        return { game, gameClones, interrupt, draw: false };
    }

    game.alivePlayers().forEach((p) => {
      if (p.name === game.getCurrentPlayerName()) {
        p.endGameMessage = "had no legal moves";
      } else {
        p.endGameMessage = "stalemated";
      }
      p.alive = false;
    });

    return { game, gameClones, interrupt, draw: "stalemate" };
  },
};
