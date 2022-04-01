import { range, toLocation } from "utilities";
import { PlayerName, PieceName } from "game/types";
import {
  addPiecesToSquareBoardByRankSetup,
  addStandardAdjacenciesToSquareBoard,
  generateSquareGrid,
  GET_GAIT_GENERATOR,
  SQUARE_CLOCKWISE_DIRECTIONS,
  PieceSet,
  isPieceNameCaptured,
} from "../utilities";
import type { RankSetup } from "../utilities";
import {
  TrivialParameterRule,
  ForSquareGenerationModify,
  OnBoardCreate,
  GetGaitGenerator,
  InPostMoveGenerationFilter,
} from "../CompactRules";
import { Move, Board } from "game";

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
  inPostMoveGenerationFilter: (input): InPostMoveGenerationFilter => {
    if (input.filtered) return input;
    const board = input.game.board;
    return {
      ...input,
      filtered: invalidMoveIntoPromotionRank(input.move, board),
    };
  },
});

function invalidMoveIntoPromotionRank(move: Move, board: Board): boolean {
  // does the move leave a pawn on player final promo rank - and not capture a king
  return (
    move.pieceDeltas.some((pieceDelta) => {
      const piece = board.getPiece(pieceDelta.pieceId);
      return (
        piece?.name === PieceName.Pawn &&
        (pieceDelta.promoteTo === PieceName.Pawn || !pieceDelta.promoteTo) &&
        RESTRICTING_REGIONS[piece.owner as keyof typeof RESTRICTING_REGIONS].includes(
          pieceDelta.path.getEnd()
        )
      );
    }) && !isPieceNameCaptured(move, board, PieceName.King)
  );
}

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
const promotionRegionWhite = range(8, 10).flatMap((rank) =>
  range(1, 10).map((file) => toLocation({ rank, file }))
);
const promotionRegionBlack = range(1, 3).flatMap((rank) =>
  range(1, 10).map((file) => toLocation({ rank, file }))
);

// final promotion ranks
const RESTRICTING_REGIONS = {
  [PlayerName.White]: range(1, 10).map((file) => toLocation({ rank: 10, file })),
  [PlayerName.Black]: range(1, 10).map((file) => toLocation({ rank: 1, file })),
};
