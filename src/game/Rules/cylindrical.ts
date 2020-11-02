import { Adjacency, Board, Square } from "../Board";
import { Rule } from "./Rules";
import { Direction, RankAndFileBounds } from "../types";

export const cylindrical: Rule = {
  name: "Cylinder",
  description:
    "The board has been wrapped onto a cylinder, and the vertical edges have been glued together. This allows pieces to move off the right side of the board onto the left side, and vice versa.",
  onBoardCreatedModify: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(cylindricalAdjacenciesRule(bounds, board));
    return { board };
  },
};

const cylindricalAdjacenciesRule = (
  { minFile, maxFile }: RankAndFileBounds,
  board: Board
) => (square: Square): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return file === minFile
    ? [
        { direction: Direction.W, location: `R${rank}F${maxFile}` },
        ...(board
          ?.squareAt(`R${rank}F${maxFile}`)
          ?.go(Direction.N)
          ?.map((location) => ({ direction: Direction.NW, location })) || []),
        ...(board
          ?.squareAt(`R${rank}F${maxFile}`)
          ?.go(Direction.S)
          ?.map((location) => ({ direction: Direction.SW, location })) || []),
      ]
    : file === maxFile
    ? [
        { direction: Direction.E, location: `R${rank}F${minFile}` },
        ...(board
          ?.squareAt(`R${rank}F${minFile}`)
          ?.go(Direction.N)
          ?.map((location) => ({ direction: Direction.NE, location })) || []),
        ...(board
          ?.squareAt(`R${rank}F${minFile}`)
          ?.go(Direction.S)
          ?.map((location) => ({ direction: Direction.SE, location })) || []),
      ]
    : [];
};
