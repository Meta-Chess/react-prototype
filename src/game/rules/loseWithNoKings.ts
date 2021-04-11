import { PieceName } from "../types";
import { LocationPrefix } from "game/Board/location";
import { Rule, ParameterRule, LethalCondition } from "./CompactRules";

export const loseWithNoKings: ParameterRule = (): Rule => {
  return {
    title: "Lose with no kings",
    description: "If you have no kings, you've lost the game!",
    lethalCondition: ({ board, player, dead }): LethalCondition => {
      if (dead) return { board, player, dead };
      const hasKing = board
        .getPieces()
        .some(
          (piece) =>
            piece.name === PieceName.King &&
            piece.owner === player &&
            piece.location.charAt(0) !== LocationPrefix.graveyard
        );
      return { board, player, dead: hasKing ? false : "lost their king" };
    },
  };
};
