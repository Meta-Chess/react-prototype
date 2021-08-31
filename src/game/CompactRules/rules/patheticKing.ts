import { PieceName } from "game/types";
import { Rule, ParameterRule, OnGaitsGeneratedModify } from "../CompactRules";
import { getDefaultParams } from "../utilities";

export const patheticKing: ParameterRule = (
  ruleParams = getDefaultParams("patheticKingSettings")
): Rule => {
  return {
    title: "Pathetic King",
    description: "Kings cannot capture",
    onGaitsGeneratedModify: ({ gaits, piece }): OnGaitsGeneratedModify => ({
      gaits:
        piece.name === PieceName.King
          ? ruleParams["Kings cannot move"] || false
            ? gaits.flatMap((_gait) => [])
            : gaits.flatMap((gait) => [{ ...gait, mustNotCapture: true }])
          : gaits,
      piece,
    }),
  };
};
