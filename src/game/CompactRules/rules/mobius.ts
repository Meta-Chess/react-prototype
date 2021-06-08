import { Adjacency, Square } from "game/Board";
import { Direction, RankAndFileBounds } from "game/types";
import { wrapToCylinder } from "utilities";
import { ParameterRule, PiecesUnderSquare, AfterBoardCreation } from "../CompactRules";

export const mobius: ParameterRule = () => ({
  title: "Möbius",
  description: "You can see the pieces on the other side of the Möbius Strip",
  piecesUnderSquare: ({ square, board, pieceIds }): PiecesUnderSquare => {
    const bounds = board.rankAndFileBounds();
    const locationUnderSquare = getLocationUnderSquare(square, bounds);
    const newPieceIds = board.squareAt(locationUnderSquare)?.pieces;
    return { square, board, pieceIds: [...pieceIds, ...(newPieceIds || [])] };
  },
  afterBoardCreation: ({ board }): AfterBoardCreation => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(mobiusAdjacenciesRule(bounds));
    return { board };
  },
});

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
