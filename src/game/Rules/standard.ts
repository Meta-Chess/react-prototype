import { range2, toLocation } from "utilities";
import { Adjacency, Piece, Square } from "../Board";
import { Direction, PieceName, Player, RankAndFileBounds } from "../types";
import { Rule } from "./Rules";
import { createPiece } from "./utilities";

export const standard: Rule = {
  name: "Standard",
  description:
    "This rule takes care of all the details of your usual bog-standard board and piece set-up.",
  forSquareGenerationModify: ({ board }) => {
    board.addSquares(generateStandardSquares());
    return { board };
  },
  onBoardCreatedModify: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(standardAdjacencies(bounds));
    board.addPiecesByRule(standardPiecesRule);
    return { board };
  },
};

const generateStandardSquares = (): { location: string; square: Square }[] =>
  range2(1, 8, 1, 8)
    .flat()
    .map(({ x, y }) => {
      const location = toLocation({ rank: y, file: x });
      return { location, square: new Square(location, { rank: y, file: x }) };
    });

const standardAdjacencies = (_bounds: RankAndFileBounds) => (
  square: Square
): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return [
    { direction: Direction.N, location: toLocation({ rank: rank + 1, file }) },
    { direction: Direction.NE, location: toLocation({ rank: rank + 1, file: file + 1 }) },
    { direction: Direction.E, location: toLocation({ rank, file: file + 1 }) },
    { direction: Direction.SE, location: toLocation({ rank: rank - 1, file: file + 1 }) },
    { direction: Direction.S, location: toLocation({ rank: rank - 1, file }) },
    { direction: Direction.SW, location: toLocation({ rank: rank - 1, file: file - 1 }) },
    { direction: Direction.W, location: toLocation({ rank, file: file - 1 }) },
    { direction: Direction.NW, location: toLocation({ rank: rank + 1, file: file - 1 }) },
  ];
};

const standardPiecesRule = (square: Square): Piece[] => {
  const { rank, file } = square.getCoordinates();
  const location = toLocation({ rank, file });
  const owner = rank > 4 ? Player.Black : Player.White;

  if (rank === 2) return [createPiece({ location, owner, name: PieceName.Pawn })];
  if (rank === 1) {
    if (file === 1 || file === 8)
      return [createPiece({ location, owner, name: PieceName.Rook })];
    if (file === 2 || file === 7)
      return [createPiece({ location, owner, name: PieceName.Knight })];
    if (file === 3 || file === 6)
      return [createPiece({ location, owner, name: PieceName.Bishop })];
    if (file === 4) return [createPiece({ location, owner, name: PieceName.Queen })];
    if (file === 5) return [createPiece({ location, owner, name: PieceName.King })];
  }

  if (rank === 7) return [createPiece({ location, owner, name: PieceName.Pawn })];
  if (rank === 8) {
    if (file === 1 || file === 8)
      return [createPiece({ location, owner, name: PieceName.Rook })];
    if (file === 2 || file === 7)
      return [createPiece({ location, owner, name: PieceName.Knight })];
    if (file === 3 || file === 6)
      return [createPiece({ location, owner, name: PieceName.Bishop })];
    if (file === 4) return [createPiece({ location, owner, name: PieceName.Queen })];
    if (file === 5) return [createPiece({ location, owner, name: PieceName.King })];
  }

  return [];
};
