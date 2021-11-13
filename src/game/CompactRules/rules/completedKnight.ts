import { PieceName } from "game/types";
import { Rule, TrivialParameterRule, OnGaitsGeneratedModify } from "../CompactRules";
import { range, uniq } from "lodash";

export const completedKnight: TrivialParameterRule = (): Rule => {
  return {
    title: "Completed Knight",
    description: "Knights additionally move 3 spaces in each lateral direction.",
    onGaitsGeneratedModify: ({ game, gaits, piece }): OnGaitsGeneratedModify => ({
      game,
      gaits:
        piece.name === PieceName.Knight
          ? [
              ...gaits,
              ...uniq(gaits.map((gait) => gait.pattern[0])).flatMap((lateralDir) => [
                { nonBlocking: true, pattern: range(3).map((_i) => lateralDir) },
              ]),
            ]
          : gaits,
      piece,
    }),
  };
};
