import { Direction } from "../types";
import { Rule } from "./Rules";

export const passiveMoveThroughBoard: Rule = {
  name: "Passive Move Through Board",
  description:
    "All pieces can move through the board (assuming there's a square on the other side)!",
  onGaitsGeneratedModify: ({ gaits, piece }) => ({
    gaits: [...gaits, passiveMoveThroughBoardGait],
    piece,
  }),
};

const passiveMoveThroughBoardGait = {
  pattern: [Direction.Down],
  mustNotCapture: true,
};
