import { Square } from "../Square";
import { Piece } from "../Square/Piece";
import { PieceType, Player } from "domain/State/types";
import { Direction } from "domain/State/Direction";

const square = (rank: number, file: number, piece: Piece) => {
  const adjacencies = {
    [Direction.N]: [`R${rank + 1}F${file}`],
    [Direction.NE]: [`R${rank + 1}F${file + 1}`],
    [Direction.E]: [`R${rank}F${file + 1}`],
    [Direction.SE]: [`R${rank - 1}F${file + 1}`],
    [Direction.S]: [`R${rank - 1}F${file}`],
    [Direction.SW]: [`R${rank - 1}F${file - 1}`],
    [Direction.W]: [`R${rank}F${file - 1}`],
    [Direction.NW]: [`R${rank + 1}F${file - 1}`],
  };
  return {
    [`R${rank}F${file}`]: new Square(adjacencies, [piece], { rank, file }, {}),
  };
};

const whitePawn = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Pawn, [], Player.White, {})
  );

const whiteRook = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Rook, [], Player.White, {})
  );

const whiteKnight = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Knight, [], Player.White, {})
  );

const whiteBishop = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Bishop, [], Player.White, {})
  );

const whiteKing = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.King, [], Player.White, {})
  );

const whiteQueen = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Queen, [], Player.White, {})
  );

const blackPawn = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Pawn, [], Player.Black, {})
  );

const blackRook = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Rook, [], Player.Black, {})
  );

const blackKnight = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Knight, [], Player.Black, {})
  );

const blackBishop = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Bishop, [], Player.Black, {})
  );

const blackKing = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.King, [], Player.Black, {})
  );

const blackQueen = (rank: number, file: number) =>
  square(
    rank,
    file,
    new Piece(`R${rank}F${file}`, PieceType.Queen, [], Player.Black, {})
  );

const emptySquare = (rank: number, file: number) => ({
  [`R${rank}F${file}`]: new Square({}, [], { rank, file }, {}),
});

const ranks = Array.from(Array(8).keys()).map((n) => n + 1);
const files = Array.from(Array(8).keys()).map((n) => n + 1);

export const standardSetup = ranks
  .map((rank) =>
    files
      .map((file) => {
        if (rank === 2) return whitePawn(rank, file);
        if (rank === 7) return blackPawn(rank, file);
        if (rank === 1) {
          if (file === 1 || file === 8) return whiteRook(rank, file);
          if (file === 2 || file === 7) return whiteKnight(rank, file);
          if (file === 3 || file === 6) return whiteBishop(rank, file);
          if (file === 4) return whiteQueen(rank, file);
          if (file === 5) return whiteKing(rank, file);
        }
        if (rank === 8) {
          if (file === 1 || file === 8) return blackRook(rank, file);
          if (file === 2 || file === 7) return blackKnight(rank, file);
          if (file === 3 || file === 6) return blackBishop(rank, file);
          if (file === 4) return blackQueen(rank, file);
          if (file === 5) return blackKing(rank, file);
        }
        return emptySquare(rank, file);
      })
      .reduce((acc, result) => ({ ...acc, ...result }))
  )
  .reduce((acc, result) => ({ ...acc, ...result }));
