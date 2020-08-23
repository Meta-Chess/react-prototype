import { range } from "utilities";
import { Adjacency, Square, Piece } from "../Board";
import { createPiece, PieceSet } from "../Board/Piece/pieceFactory";
import {
  Variant,
  Player,
  Direction,
  RankAndFileBounds,
  PieceName,
  SquareShape,
  TokenName,
} from "domain/Game/types";

export const Hex: Variant = {
  forSquareGenerationModify: ({ board }) => {
    board.addSquares(hexSquares);
    return { board };
  },
  onBoardCreatedModify: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(standardAdjacencies(bounds));
    board.addPiecesByRule(standardPiecesRule);
    board.addToken(hexShapeToken);
    return { board };
  },
};

const hexShapeToken = {
  name: TokenName.Shape,
  validTo: undefined,
  data: { shape: SquareShape.Hex },
};

const hexSquares = range(1, 11)
  .map((x) => range(1 + Math.abs(x - 6), 11 - Math.abs(x - 6), 2).map((y) => ({ x, y })))
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
    { direction: Direction.H1, location: `R${rank + 3}F${file + 1}` },
    { direction: Direction.H2, location: `R${rank + 1}F${file + 1}` },
    { direction: Direction.H3, location: `R${rank}F${file + 2}` },
    { direction: Direction.H4, location: `R${rank - 1}F${file + 1}` },
    { direction: Direction.H5, location: `R${rank - 3}F${file + 1}` },
    { direction: Direction.H6, location: `R${rank - 2}F${file}` },
    { direction: Direction.H7, location: `R${rank - 3}F${file - 1}` },
    { direction: Direction.H8, location: `R${rank - 1}F${file - 1}` },
    { direction: Direction.H9, location: `R${rank}F${file - 2}` },
    { direction: Direction.H10, location: `R${rank + 1}F${file - 1}` },
    { direction: Direction.H11, location: `R${rank + 3}F${file - 1}` },
    { direction: Direction.H12, location: `R${rank + 2}F${file}` },
  ];
};

const standardPiecesRule = (square: Square): Piece[] => {
  const { rank, file } = square.getCoordinates();
  const location = `R${rank}F${file}`;
  const owner = rank > 10 ? Player.Black : Player.White;
  const set = PieceSet.HexStandard;

  if ([1, 3, 5].includes(rank) && file === 6)
    return [createPiece({ location, owner, name: PieceName.Bishop, set })];
  if (rank === 2 && file === 5)
    return [createPiece({ location, owner, name: PieceName.Queen, set })];
  if (rank === 2 && file === 7)
    return [createPiece({ location, owner, name: PieceName.King, set })];
  if (rank === 3 && [4, 8].includes(file))
    return [createPiece({ location, owner, name: PieceName.Knight, set })];
  if (rank === 4 && [3, 9].includes(file))
    return [createPiece({ location, owner, name: PieceName.Rook, set })];
  if (rank === 9 - Math.abs(file - 6))
    return [createPiece({ location, owner, name: PieceName.Pawn, set })];

  if ([21, 19, 17].includes(rank) && file === 6)
    return [createPiece({ location, owner, name: PieceName.Bishop, set })];
  if (rank === 20 && file === 5)
    return [createPiece({ location, owner, name: PieceName.Queen, set })];
  if (rank === 20 && file === 7)
    return [createPiece({ location, owner, name: PieceName.King, set })];
  if (rank === 19 && [4, 8].includes(file))
    return [createPiece({ location, owner, name: PieceName.Knight, set })];
  if (rank === 18 && [3, 9].includes(file))
    return [createPiece({ location, owner, name: PieceName.Rook, set })];
  if (rank === 13 + Math.abs(file - 6))
    return [createPiece({ location, owner, name: PieceName.Pawn, set })];

  return [];
};
