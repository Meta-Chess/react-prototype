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

export const grandChess: TrivialParameterRule = () => ({
  title: "Grand Chess",
  description:
    "Grand chess is a large-board chess variant invented by Dutch games designer Christian Freeling in 1984.",
  forSquareGenerationModify: ({ board, numberOfPlayers }): ForSquareGenerationModify => {
    board.addSquares(generateSquareGrid(10));
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
  10: ["r", "", "", "", "", "", "", "", "", "r"],
  9: ["", "n", "b", "q", "k", "rn", "bn", "b", "n", ""],
  8: ["p", "p", "p", "p", "p", "p", "p", "p", "p", "p"],
  3: ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
  2: ["", "N", "B", "Q", "K", "RN", "BN", "B", "N", ""],
  1: ["R", "", "", "", "", "", "", "", "", "R"],
};

const centerRegion = [
  toLocation({ rank: 5, file: 5 }),
  toLocation({ rank: 5, file: 6 }),
  toLocation({ rank: 6, file: 5 }),
  toLocation({ rank: 6, file: 6 }),
];
const promotionRegionWhite = range(1, 10).map((file) => toLocation({ rank: 10, file }));
const promotionRegionBlack = range(1, 10).map((file) => toLocation({ rank: 1, file }));
