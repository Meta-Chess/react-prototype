import { Adjacency, Square } from "../Board";
import { Direction, RankAndFileBounds, Rule } from "game/types";

export const HexCylindrical: Rule = {
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
        { direction: Direction.H7, location: `R${rank - 6}F${maxFile}` },
        { direction: Direction.H8, location: `R${rank - 2}F${maxFile}` },
        { direction: Direction.H9, location: `R${rank}F${maxFile}` },
        { direction: Direction.H10, location: `R${rank + 2}F${maxFile}` },
        { direction: Direction.H11, location: `R${rank + 6}F${maxFile}` },
      ]
    : file === maxFile
    ? [
        { direction: Direction.H1, location: `R${rank + 6}F${minFile}` },
        { direction: Direction.H2, location: `R${rank + 2}F${minFile}` },
        { direction: Direction.H3, location: `R${rank}F${minFile}` },
        { direction: Direction.H4, location: `R${rank - 2}F${minFile}` },
        { direction: Direction.H5, location: `R${rank - 6}F${minFile}` },
      ]
    : [];
};
