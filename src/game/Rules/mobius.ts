import { Adjacency, Square } from "../Board";
import { Direction, RankAndFileBounds } from "../types";
import { wrapToCylinder } from "utilities";
import { Rule } from "./Rules";

export const mobius: Rule = {
  name: "Möbius",
  description: "You can see the pieces on the other side of the Möbius Strip",
  piecesUnderSquare: ({ square, board, pieceIds }) => {
    const bounds = board.rankAndFileBounds();
    const locationUnderSquare = getLocationUnderSquare(square, bounds);
    const newPieceIds = board.squareAt(locationUnderSquare)?.pieces;
    return { square, board, pieceIds: [...pieceIds, ...(newPieceIds || [])] };
  },
  onBoardCreatedModify: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(mobiusAdjacenciesRule(bounds));
    return { board };
  },
};

const mobiusAdjacenciesRule = (bounds: RankAndFileBounds) => (
  square: Square
): Adjacency[] => {
  const locationUnderSquare = getLocationUnderSquare(square, bounds);
  return [{ direction: Direction.Down, location: locationUnderSquare }];
};

const getLocationUnderSquare = (
  square: Square,
  { minRank, maxRank, minFile, maxFile }: RankAndFileBounds
): string => {
  const { rank, file } = square.getCoordinates();
  const rankWrapFunction = wrapToCylinder(minRank, maxRank);
  const rankUnderSquare = rankWrapFunction(
    rank + Math.floor((maxRank - minRank + 1) / 2)
  );
  const fileUnderSquare = maxFile - file + minFile;
  return `R${rankUnderSquare}F${fileUnderSquare}`;
};
