import { Gait } from "domain/Game/types";
import { Direction } from "domain/Game/types";

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

export const ROOK_GAITS: Gait[] = NonDiagonalDirections.map((A) => ({
  pattern: [A],
  repeats: true,
}));

export const BISHOP_GAITS: Gait[] = DiagonalDirections.map((A) => ({
  pattern: [A],
  repeats: true,
}));

export const KNIGHT_GAITS: Gait[] = NonDiagonalDirections.map((A) =>
  knightTurnDirections(A).map((B) => [
    { pattern: [A, A, B], nonBlocking: true },
    { pattern: [B, A, A], nonBlocking: true },
  ])
)
  .flat()
  .flat();

export const QUEEN_GAITS: Gait[] = [...ROOK_GAITS, ...BISHOP_GAITS];

export const KING_GAITS: Gait[] = NonDiagonalDirections.map((A) => ({ pattern: [A] }));

export const WHITE_PAWN_GAITS: Gait[] = [
  { pattern: [Direction.H12], mustNotCapture: true },
  { pattern: [Direction.H2], mustCapture: true },
  { pattern: [Direction.H10], mustCapture: true },
];
export const WHITE_PAWN_DS_GAITS: Gait[] = [
  { pattern: [Direction.H12, Direction.H12], mustNotCapture: true },
];

export const BLACK_PAWN_GAITS: Gait[] = [
  { pattern: [Direction.H6], mustNotCapture: true },
  { pattern: [Direction.H4], mustCapture: true },
  { pattern: [Direction.H8], mustCapture: true },
];
export const BLACK_PAWN_DS_GAITS: Gait[] = [
  { pattern: [Direction.H6, Direction.H6], mustNotCapture: true },
];
