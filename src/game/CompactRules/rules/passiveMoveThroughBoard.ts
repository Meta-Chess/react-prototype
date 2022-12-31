import { Direction } from "game/types";
import { OnGaitsGeneratedModify, TrivialParameterRule } from "../CompactRules";

export const passiveMoveThroughBoard: TrivialParameterRule = () => ({
  title: "Passive Move Through Board",
  description:
    "All pieces can move through the board (assuming there's a square on the other side)!",
  onGaitsGeneratedModify: ({ game, gaits, piece }): OnGaitsGeneratedModify => ({
    game,
    gaits: [...gaits, passiveMoveThroughBoardGait],
    piece,
  }),
});

const passiveMoveThroughBoardGait = {
  pattern: [Direction.Down],
  mustNotCapture: true,
};
