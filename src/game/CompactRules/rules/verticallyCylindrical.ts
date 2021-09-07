import { Adjacency, Board, Square } from "game/Board";
import { Rule, ParameterRule, AfterBoardCreation } from "../CompactRules";
import { Direction, RankAndFileBounds } from "game/types";
import { toLocation } from "utilities";

export const verticallyCylindrical: ParameterRule = (): Rule => {
  return {
    title: "Vertical Cylinder",
    description:
      "The board has been wrapped onto a cylinder, and the top and bottom ranks have been glued together. This allows pieces to move off the top edge of the board onto the bottom edge, and vice versa.",
    afterBoardCreation: ({ board }): AfterBoardCreation => {
      const bounds = board.rankAndFileBounds();
      board.addAdjacenciesByRule(cylindricalAdjacenciesRule(bounds, board));
      return { board };
    },
  };
};

const cylindricalAdjacenciesRule =
  ({ minRank, maxRank }: RankAndFileBounds, board: Board) =>
  (square: Square): Adjacency[] => {
    const { rank, file } = square.getCoordinates();
    return rank === minRank
      ? [
          { direction: Direction.S, location: toLocation({ rank: maxRank, file }) },
          ...(board
            ?.squareAt(toLocation({ rank: maxRank, file }))
            ?.go(Direction.W)
            ?.map((location) => ({ direction: Direction.SW, location })) || []),
          ...(board
            ?.squareAt(toLocation({ rank: maxRank, file }))
            ?.go(Direction.E)
            ?.map((location) => ({ direction: Direction.SE, location })) || []),
        ]
      : rank === maxRank
      ? [
          { direction: Direction.N, location: toLocation({ rank: minRank, file }) },
          ...(board
            ?.squareAt(toLocation({ rank: minRank, file }))
            ?.go(Direction.W)
            ?.map((location) => ({ direction: Direction.NW, location })) || []),
          ...(board
            ?.squareAt(toLocation({ rank: minRank, file }))
            ?.go(Direction.E)
            ?.map((location) => ({ direction: Direction.NE, location })) || []),
        ]
      : [];
  };
