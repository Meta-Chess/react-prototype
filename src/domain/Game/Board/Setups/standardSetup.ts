import { Square } from "../Square";
import { Piece } from "../Piece";
import { Adjacency } from "../Adjacencies";
import { Player } from "domain/Game/types";
import { Direction } from "domain/Game/types";
import * as pieceFactory from "../Piece/pieceFactory";
import { range2 } from "utilities";

export const standardSetup = {
  squares: range2(1, 8, 1, 8)
    .flat()
    .map(({ x, y }) => {
      const location = `R${y}F${x}`;
      return { location, square: new Square(location, { rank: y, file: x }) };
    }),
  adjacenciesRule: (square: Square): Adjacency[] => {
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
  },
  piecesRule: (square: Square): Piece[] => {
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
  },
};
