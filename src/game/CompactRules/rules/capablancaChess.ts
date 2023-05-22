import { range, toLocation } from "utilities";
import { PlayerName } from "game/types";
import type { RankSetup } from "../utilities";
import {
  addPiecesToSquareBoardByRankSetup,
  addStandardAdjacenciesToSquareBoard,
  generateRectangularGrid,
  GET_GAIT_GENERATOR,
  PieceSet,
  SQUARE_CLOCKWISE_DIRECTIONS,
} from "../utilities";
import {
  ForSquareGenerationModify,
  GetGaitGenerator,
  OnBoardCreate,
  TrivialParameterRule,
} from "../CompactRules";

export const capablancaChess: TrivialParameterRule = () => ({
  title: "Capablanca Chess",
  description:
    "A large-board chess variant invented by World Chess Champion José Raúl Capablanca.",
  forSquareGenerationModify: ({ board, numberOfPlayers }): ForSquareGenerationModify => {
    board.addSquares(generateRectangularGrid(10, 8));
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
  8: ["r", "n", "bn", "b", "q", "k", "b", "rn", "n", "r"],
  7: ["p", "p", "p", "p", "p", "p", "p", "p", "p", "p"],
  2: ["P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
  1: ["R", "N", "BN", "B", "Q", "K", "B", "RN", "N", "R"],
};

const centerRegion = [
  toLocation({ rank: 4, file: 4 }),
  toLocation({ rank: 4, file: 5 }),
  toLocation({ rank: 5, file: 4 }),
  toLocation({ rank: 5, file: 5 }),
];
const promotionRegionWhite = range(1, 10).map((file) => toLocation({ rank: 8, file }));
const promotionRegionBlack = range(1, 10).map((file) => toLocation({ rank: 1, file }));
