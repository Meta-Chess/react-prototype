import type { TrivialParameterRule, WinCondition } from "game/CompactRules";
import { PieceName } from "game/types";

export const kingOfTheHill: TrivialParameterRule = () => ({
  title: "King Of The Hill",
  description: "If a player's king is on the hill at the start of their turn, they win.",

  winCondition: ({ game, winners, ...rest }): WinCondition => {
    const { name: currentPlayer, alive } = game.getCurrentPlayer();
    if (winners.includes(currentPlayer) || !alive) return { game, winners, ...rest };

    if (
      game.board
        .getRegion("center")
        .findIndex(
          (square) =>
            square.pieces
              .map((p) => game.board.getPiece(p))
              .findIndex(
                (piece) => piece?.name === PieceName.King && piece.owner === currentPlayer
              ) > -1
        ) > -1
    ) {
      winners.push(currentPlayer);
      game.getCurrentPlayer().endGameMessage = "is king of the hill";
    }

    return { game, winners, ...rest };
  },
});
