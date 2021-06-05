import { Rule, ParameterRule, DrawCondition } from "../CompactRules";
import { hasLegalMoves } from "../utilities";

export const stalemate: ParameterRule = (): Rule => {
  return {
    title: "Stalemate",
    description:
      "If a player has no legal moves the game is declared a draw by stalemate.",

    drawCondition: ({ game, gameClones, interrupt, draw }): DrawCondition => {
      if (draw !== false) return { game, gameClones, interrupt, draw };

      if (hasLegalMoves(game.getCurrentPlayerName(), game, gameClones, interrupt))
        return { game, gameClones, interrupt, draw: false };

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
};
