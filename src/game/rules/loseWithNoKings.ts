import { PieceName } from "../types";
import { Rule } from "./CompactRules";

export const loseWithNoKings: Rule = {
  title: "Lose with no kings",
  description: "If you have no kings, you've lost the game!",
  lethalCondition: ({ board, player, dead }) => {
    if (dead) return { board, player, dead };
    const hasKing = board
      .getPieces()
      .some((piece) => piece.name === PieceName.King && piece.owner === player);
    return { board, player, dead: hasKing ? false : "lost their king" };
  },
};
