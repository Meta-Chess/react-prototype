import { Rule, PieceName } from "../types";

export const loseWithNoKings: Rule = {
  lethalCondition: ({ board, player, dead }) => {
    if (dead) return { board, player, dead: true };
    const hasKing = board
      .pieces()
      .some((piece) => piece.name === PieceName.King && piece.owner === player);
    return { board, player, dead: !hasKing };
  },
};
