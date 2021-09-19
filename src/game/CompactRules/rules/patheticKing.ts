import { PieceName } from "game/types";
import { Rule, ParameterRule, OnGaitsGeneratedModify } from "../CompactRules";

export const patheticKing: ParameterRule<"patheticKing"> = ({
  "And cannot move without assistance": cantMove,
}): Rule => {
  return {
    title: "Pathetic King",
    description: "Kings cannot capture",
    onGaitsGeneratedModify: ({ gaits, piece }): OnGaitsGeneratedModify => ({
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
