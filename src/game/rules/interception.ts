import { TokenName } from "game/types";
import { Rule } from ".";

export const interception: Rule = {
  title: "Interception",
  description:
    "Enables interceptable moves where pieces can be captured by moving to a square that they moved through",
  postMove: ({ game, interrupt, board, move, currentTurn }) => {
    if (move.data?.interceptable) {
      const start = move.data?.interceptableAtStart ? 0 : 1;

      move.pieceDeltas
        .find((delta) => delta.pieceId === move.pieceId)
        ?.path.getPath()
        .slice(start, -1)
        .forEach((location) => {
          const interceptionToken = {
            name: TokenName.CaptureToken,
            expired: (turn: number): boolean => {
              return turn >= currentTurn + 1;
            },
            data: {
              pieceId: move.pieceId,
              condition: move.data?.interceptionCondition,
            },
          };

          board.squareAt(location)?.addToken(interceptionToken);
        });
    }

    return { game, interrupt, board, move, currentTurn };
  },
};
