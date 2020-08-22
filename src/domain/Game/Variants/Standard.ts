import { range2 } from "utilities";
import { Adjacency, Square, Piece } from "../Board";
import * as pieceFactory from "../Board/Piece/pieceFactory";
import { Variant, Player, Direction, RankAndFileBounds } from "domain/Game/types";

export const Standard: Variant = {
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
  if (rank === 2) return [pieceFactory.createPawn(`R${rank}F${file}`, Player.White)];
  if (rank === 7) return [pieceFactory.createPawn(`R${rank}F${file}`, Player.Black)];
  if (rank === 1) {
    if (file === 1 || file === 8)
      return [pieceFactory.createRook(`R${rank}F${file}`, Player.White)];
    if (file === 2 || file === 7)
      return [pieceFactory.createKnight(`R${rank}F${file}`, Player.White)];
    if (file === 3 || file === 6)
      return [pieceFactory.createBishop(`R${rank}F${file}`, Player.White)];
    if (file === 4) return [pieceFactory.createQueen(`R${rank}F${file}`, Player.White)];
    if (file === 5) return [pieceFactory.createKing(`R${rank}F${file}`, Player.White)];
  }
  if (rank === 8) {
    if (file === 1 || file === 8)
      return [pieceFactory.createRook(`R${rank}F${file}`, Player.Black)];
    if (file === 2 || file === 7)
      return [pieceFactory.createKnight(`R${rank}F${file}`, Player.Black)];
    if (file === 3 || file === 6)
      return [pieceFactory.createBishop(`R${rank}F${file}`, Player.Black)];
    if (file === 4) return [pieceFactory.createQueen(`R${rank}F${file}`, Player.Black)];
    if (file === 5) return [pieceFactory.createKing(`R${rank}F${file}`, Player.Black)];
  }
  return [];
};
