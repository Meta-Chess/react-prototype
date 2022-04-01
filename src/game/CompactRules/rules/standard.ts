import { range, toLocation } from "utilities";
import { PlayerName } from "game/types";
import {
  addPiecesToSquareBoardByRankSetup,
  addStandardAdjacenciesToSquareBoard,
  generateSquareGrid,
  GET_GAIT_GENERATOR,
  SQUARE_CLOCKWISE_DIRECTIONS,
  PieceSet,
} from "../utilities";
import type { RankSetup } from "../utilities";
import {
  TrivialParameterRule,
  ForSquareGenerationModify,
  OnBoardCreate,
  GetGaitGenerator,
} from "../CompactRules";

export const standard: TrivialParameterRule = () => ({
  title: "Standard",
  description:
    "This rule takes care of all the details of your usual bog-standard board and piece set-up.",
  forSquareGenerationModify: ({ board, numberOfPlayers }): ForSquareGenerationModify => {
    board.addSquares(generateSquareGrid(8));
    board.defineRegion("center", centerRegion);
    board.defineRegion("promotion", promotionRegionWhite, PlayerName.White);
    board.defineRegion("promotion", promotionRegionBlack, PlayerName.Black);
    board.defineClockwiseDirections(SQUARE_CLOCKWISE_DIRECTIONS);
    return { board, numberOfPlayers };
  },
  onBoardCreate: ({ board, numberOfPlayers }): OnBoardCreate => {
    addStandardAdjacenciesToSquareBoard(board);
    addPiecesToSquareBoardByRankSetup(board, standardSetup);
    return { board, numberOfPlayers };
  },
  getGaitGenerator: ({ gaitGenerator, name, owner }): GetGaitGenerator => {
    return GET_GAIT_GENERATOR({ gaitGenerator, name, owner, set: PieceSet.Standard });
  },
});

const standardSetup: RankSetup = {
  8: ["r", "n", "b", "q", "k", "b", "n", "r"],
  7: ["p", "p", "p", "p", "p", "p", "p", "p"],
  2: ["P", "P", "P", "P", "P", "P", "P", "P"],
  1: ["R", "N", "B", "Q", "K", "B", "N", "R"],
};

const centerRegion = [
  toLocation({ rank: 4, file: 4 }),
  toLocation({ rank: 4, file: 5 }),
  toLocation({ rank: 5, file: 4 }),
  toLocation({ rank: 5, file: 5 }),
];
const promotionRegionWhite = range(1, 8).map((file) => toLocation({ rank: 8, file }));
const promotionRegionBlack = range(1, 8).map((file) => toLocation({ rank: 1, file }));
