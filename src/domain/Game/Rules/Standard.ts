import { range2 } from "utilities";
import { Adjacency, createPiece, Piece, Square } from "domain/Game/Board";
import { Direction, PieceName, Player, RankAndFileBounds, Rule } from "domain/Game/types";

export const Standard: Rule = {
  forSquareGenerationModify: ({ board }) => {
    board.addSquares(standardSquares);
    return { board };
  },
  onBoardCreatedModify: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(standardAdjacencies(bounds));
    board.addPiecesByRule(standardPiecesRule);
    return { board };
  },
};

const standardSquares = range2(1, 8, 1, 8)
  .flat()
  .map(({ x, y }) => {
    const location = `R${y}F${x}`;
    return { location, square: new Square(location, { rank: y, file: x }) };
  });

// TODO: Generalise to nxn by paying attention to bounds. Possibly extract
const standardAdjacencies = (_bounds: RankAndFileBounds) => (
  square: Square
): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return [
    { direction: Direction.N, location: `R${rank + 1}F${file}` },
    { direction: Direction.NE, location: `R${rank + 1}F${file + 1}` },
    { direction: Direction.E, location: `R${rank}F${file + 1}` },
    { direction: Direction.SE, location: `R${rank - 1}F${file + 1}` },
    { direction: Direction.S, location: `R${rank - 1}F${file}` },
    { direction: Direction.SW, location: `R${rank - 1}F${file - 1}` },
    { direction: Direction.W, location: `R${rank}F${file - 1}` },
    { direction: Direction.NW, location: `R${rank + 1}F${file - 1}` },
  ];
};

const standardPiecesRule = (square: Square): Piece[] => {
  const { rank, file } = square.getCoordinates();
  const location = `R${rank}F${file}`;
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
