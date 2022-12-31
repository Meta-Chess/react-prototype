import { PieceName } from "game/types";
import { OnGaitsGeneratedModify, ParameterRule, Rule } from "../CompactRules";

export const patheticKing: ParameterRule<"patheticKing"> = ({
  "And cannot move without assistance": cantMove,
}): Rule => {
  return {
    title: "Pathetic King",
    description: "Kings cannot capture",
    onGaitsGeneratedModify: ({ game, gaits, piece }): OnGaitsGeneratedModify => ({
      game,
      gaits:
        piece.name === PieceName.King
          ? cantMove
            ? gaits.flatMap((_gait) => [])
            : gaits.flatMap((gait) => [{ ...gait, mustNotCapture: true }])
          : gaits,
      piece,
    }),
  };
};
