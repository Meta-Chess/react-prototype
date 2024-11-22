import { TokenName } from "game/types";
import { PostMove, TrivialParameterRule } from "../CompactRules";
import { interceptionConditionBuilders } from "game/types/InterceptionCondition";

export const interception: TrivialParameterRule = () => ({
  title: "Interception",
  description:
    "Enables interceptable moves where pieces can be captured by moving to a square that they moved through",
  postMove: ({ game, interrupt, board, move, currentTurn }): PostMove => {
    if (!move) return { game, interrupt, board, move, currentTurn };

    if (move.data?.interceptable) {
      const start = move.data?.interceptableAtStart ? 0 : 1;

      move.pieceDeltas
        .find((delta) => delta.pieceId === move.pieceId)
        ?.path.getPath()
        .slice(start, -1)
        .forEach((location) => {
          const interceptionConditionType = move.data?.interceptionConditionType;
          const interceptionConditionBuildParams =
            move.data?.interceptionConditionBuilderParams;
          if (
            interceptionConditionType === undefined ||
            interceptionConditionBuildParams === undefined
          )
            return;

          const interceptionCondition = interceptionConditionBuilders[
            interceptionConditionType
          ](interceptionConditionBuildParams);

          const interceptionToken = {
            name: TokenName.CaptureToken,
            expired: (turn: number): boolean => {
              return turn >= currentTurn + game.players.length;
            },
            data: {
              pieceId: move.pieceId,
              condition: interceptionCondition,
            },
          };

          board.squareAt(location)?.addToken(interceptionToken);
        });
    }

    return { game, interrupt, board, move, currentTurn };
  },
});
