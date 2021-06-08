import { Direction } from "game/types";
import { ParameterRule, OnGaitsGeneratedModify } from "../CompactRules";

export const passiveMoveThroughBoard: ParameterRule = () => ({
  title: "Passive Move Through Board",
  description:
    "All pieces can move through the board (assuming there's a square on the other side)!",
  onGaitsGeneratedModify: ({ gaits, piece }): OnGaitsGeneratedModify => ({
    gaits: [...gaits, passiveMoveThroughBoardGait],
    piece,
  }),
});

const passiveMoveThroughBoardGait = {
  pattern: [Direction.Down],
  mustNotCapture: true,
};
