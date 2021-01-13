import { PieceName } from "../types";
import { Rule } from "./CompactRules";

export const patheticKing: Rule = {
  title: "Pathetic King",
  description: "Kings cannot capture",
  onGaitsGeneratedModify: ({ gaits, piece }) => ({
    gaits:
      piece.name === PieceName.King
        ? gaits.flatMap((gait) => [{ ...gait, mustNotCapture: true }])
        : gaits,
    piece,
  }),
};
