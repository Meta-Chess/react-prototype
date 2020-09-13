import { PieceName } from "../types";
import { Rule } from "./Rules";

export const loseWithNoKings: Rule = {
  name: "Lose with no kings",
  description: "If you have no kings, you've lost the game!",
  lethalCondition: ({ board, player, dead }) => {
    if (dead) return { board, player, dead: true };
    const hasKing = board
      .pieces()
      .some((piece) => piece.name === PieceName.King && piece.owner === player);
    return { board, player, dead: !hasKing };
  },
};
