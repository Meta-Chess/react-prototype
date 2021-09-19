import { PieceName } from "game/types";
import { LocationPrefix } from "game/Board/location";
import { TrivialParameterRule, LethalCondition } from "../CompactRules";

export const loseWithNoKings: TrivialParameterRule = () => ({
  title: "Lose with no kings",
  description: "If you have no kings, you've lost the game!",
  lethalCondition: ({ game, player, dead }): LethalCondition => {
    if (dead) return { game, player, dead };
    const hasKing = game.board
      .getPieces()
      .some(
        (piece) =>
          piece.name === PieceName.King &&
          piece.owner === player.name &&
          piece.location.charAt(0) !== LocationPrefix.graveyard
      );
    return { game, player, dead: hasKing ? false : "lost their king" };
  },
});
