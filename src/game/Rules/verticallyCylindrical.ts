import { Adjacency, Board, Square } from "../Board";
import { Rule } from "./Rules";
import { Direction, RankAndFileBounds } from "../types";

export const verticallyCylindrical: Rule = {
  name: "Vertical Cylinder",
  description:
    "The board has been wrapped onto a cylinder, and the horizontal edges have been glued together. This allows pieces to move off the top edge of the board onto the bottom edge, and vice versa.",
  onBoardCreatedModify: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(cylindricalAdjacenciesRule(bounds, board));
    return { board };
  },
};

const cylindricalAdjacenciesRule = (
  { minRank, maxRank }: RankAndFileBounds,
  board: Board
) => (square: Square): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return rank === minRank
    ? [
        { direction: Direction.S, location: `R${maxRank}F${file}` },
        ...(board
          ?.squareAt(`R${maxRank}F${file}`)
          ?.go(Direction.W)
          ?.map((location) => ({ direction: Direction.SW, location })) || []),
        ...(board
          ?.squareAt(`R${maxRank}F${file}`)
          ?.go(Direction.E)
          ?.map((location) => ({ direction: Direction.SE, location })) || []),
      ]
    : file === maxRank
    ? [
        { direction: Direction.N, location: `R${minRank}F${file}` },
        ...(board
          ?.squareAt(`R${minRank}F${file}`)
          ?.go(Direction.W)
          ?.map((location) => ({ direction: Direction.NW, location })) || []),
        ...(board
          ?.squareAt(`R${minRank}F${file}`)
          ?.go(Direction.E)
          ?.map((location) => ({ direction: Direction.NE, location })) || []),
      ]
    : [];
};
