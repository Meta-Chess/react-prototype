import {Gait, PieceName} from "game/types";
import { Direction } from "game/types";
import {Piece} from "game";

export const CASTLE_GAITS: Gait[] = [
  { pattern: [Direction.H4], repeats: true },
  { pattern: [Direction.H8], repeats: true },
  { pattern: [Direction.H12], repeats: true },
];

export const FORT_GAITS: Gait[] = [
  { pattern: [Direction.H2], repeats: true },
  { pattern: [Direction.H6], repeats: true },
  { pattern: [Direction.H10], repeats: true },
];

const NonDiagonalDirections = [
  Direction.H2,
  Direction.H4,
  Direction.H6,
  Direction.H8,
  Direction.H10,
  Direction.H12,
];

const DiagonalDirections = [
  Direction.H1,
  Direction.H3,
  Direction.H5,
  Direction.H7,
  Direction.H9,
  Direction.H11,
];

const knightTurnDirections = (A: Direction): Direction[] => {
  switch (A) {
    case Direction.H2:
      return [Direction.H12, Direction.H4];
    case Direction.H4:
      return [Direction.H2, Direction.H6];
    case Direction.H6:
      return [Direction.H4, Direction.H8];
    case Direction.H8:
      return [Direction.H6, Direction.H10];
    case Direction.H10:
      return [Direction.H8, Direction.H12];
    case Direction.H12:
      return [Direction.H10, Direction.H2];
    default:
      throw new Error("Invalid knight direction");
  }
};

const ROOK_GAITS: Gait[] = NonDiagonalDirections.map((A) => ({
  pattern: [A],
  repeats: true,
}));

const BISHOP_GAITS: Gait[] = DiagonalDirections.map((A) => ({
  pattern: [A],
  repeats: true,
}));

const KNIGHT_GAITS: Gait[] = NonDiagonalDirections.map((A) =>
  knightTurnDirections(A).map((B) => [
    { pattern: [A, A, B], nonBlocking: true },
    { pattern: [B, A, A], nonBlocking: true },
  ])
)
  .flat()
  .flat();

const QUEEN_GAITS: Gait[] = [...ROOK_GAITS, ...BISHOP_GAITS];

const KING_GAITS: Gait[] = NonDiagonalDirections.map((A) => ({ pattern: [A] }));

const WHITE_PAWN_GAITS: Gait[] = [
  { pattern: [Direction.H12], mustNotCapture: true },
  { pattern: [Direction.H2], mustCapture: true },
  { pattern: [Direction.H10], mustCapture: true },
];
const WHITE_PAWN_DS_GAITS: Gait[] = [
  { pattern: [Direction.H12, Direction.H12],
    mustNotCapture: true,
    data: {
    interceptable: true,
      interceptionCondition: (piece: Piece): boolean => {
        return piece.name === PieceName.Pawn;
      }
    }
  },
];

const BLACK_PAWN_GAITS: Gait[] = [
  { pattern: [Direction.H6], mustNotCapture: true },
  { pattern: [Direction.H4], mustCapture: true },
  { pattern: [Direction.H8], mustCapture: true },
];
const BLACK_PAWN_DS_GAITS: Gait[] = [
  { pattern: [Direction.H6, Direction.H6], mustNotCapture: true,
    data: {
      interceptable: true,
      interceptionCondition: (piece: Piece): boolean => {
        return piece.name === PieceName.Pawn;
      }
    }},
];

export const hexGaits = {
  ROOK_GAITS,
  BISHOP_GAITS,
  KNIGHT_GAITS,
  QUEEN_GAITS,
  KING_GAITS,
  WHITE_PAWN_GAITS,
  WHITE_PAWN_DS_GAITS,
  BLACK_PAWN_GAITS,
  BLACK_PAWN_DS_GAITS,
};
