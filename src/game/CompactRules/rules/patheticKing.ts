import { PieceName } from "game/types";
import { ParameterRule, OnGaitsGeneratedModify } from "../CompactRules";

export const patheticKing: ParameterRule = () => ({
  title: "Pathetic King",
  description: "Kings cannot capture",
  onGaitsGeneratedModify: ({ gaits, piece }): OnGaitsGeneratedModify => ({
    gaits:
      piece.name === PieceName.King
        ? gaits.flatMap((gait) => [{ ...gait, mustNotCapture: true }])
        : gaits,
    piece,
  }),
});
