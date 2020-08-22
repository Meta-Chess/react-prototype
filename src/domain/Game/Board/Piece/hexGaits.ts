import { Gait } from "domain/Game/types";
import { Direction } from "domain/Game/types";

export const ROOK_GAITS: Gait[] = [
  { pattern: [Direction.H2], repeats: true },
  { pattern: [Direction.H4], repeats: true },
  { pattern: [Direction.H6], repeats: true },
  { pattern: [Direction.H8], repeats: true },
  { pattern: [Direction.H10], repeats: true },
  { pattern: [Direction.H12], repeats: true },
];

export const BISHOP_GAITS: Gait[] = [
  { pattern: [Direction.H1], repeats: true },
  { pattern: [Direction.H3], repeats: true },
  { pattern: [Direction.H5], repeats: true },
  { pattern: [Direction.H7], repeats: true },
  { pattern: [Direction.H9], repeats: true },
  { pattern: [Direction.H11], repeats: true },
];

const NonDiagonalDirections = [
  Direction.H2,
  Direction.H4,
  Direction.H6,
  Direction.H8,
  Direction.H10,
  Direction.H12,
];
export const KNIGHT_GAITS: Gait[] = NonDiagonalDirections.map((A) =>
  NonDiagonalDirections.map((B) => [
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
