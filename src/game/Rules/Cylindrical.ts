import { Adjacency, Square } from "../Board";
import { Rule } from "./Rules";
import { Direction, RankAndFileBounds } from "../types";

export const Cylindrical: Rule = {
  onBoardCreatedModify: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(cylindricalAdjacenciesRule(bounds));
    return { board };
  },
};

const cylindricalAdjacenciesRule = ({ minFile, maxFile }: RankAndFileBounds) => (
  square: Square
): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return file === minFile
    ? [
        { direction: Direction.SW, location: `R${rank - 1}F${maxFile}` },
        { direction: Direction.W, location: `R${rank}F${maxFile}` },
        { direction: Direction.NW, location: `R${rank + 1}F${maxFile}` },
      ]
    : file === maxFile
    ? [
        { direction: Direction.NE, location: `R${rank + 1}F${minFile}` },
        { direction: Direction.E, location: `R${rank}F${minFile}` },
        { direction: Direction.SE, location: `R${rank - 1}F${minFile}` },
      ]
    : [];
};
