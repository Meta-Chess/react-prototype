import { Gait } from "game/types";
import { Direction } from "game/types";

const NonDiagonalDirections = [Direction.N, Direction.E, Direction.S, Direction.W];

const knightTurnDirections = (A: Direction): Direction[] => {
  switch (A) {
    case Direction.N:
      return [Direction.E, Direction.W];
    case Direction.E:
      return [Direction.N, Direction.S];
    case Direction.S:
      return [Direction.E, Direction.W];
    case Direction.W:
      return [Direction.N, Direction.S];
    default:
      throw new Error("Invalid knight direction");
  }
};

const ROOK_GAITS: Gait[] = [
  { pattern: [Direction.N], repeats: true },
  { pattern: [Direction.E], repeats: true },
  { pattern: [Direction.S], repeats: true },
  { pattern: [Direction.W], repeats: true },
];

const BISHOP_GAITS: Gait[] = [
  { pattern: [Direction.NE], repeats: true },
  { pattern: [Direction.SE], repeats: true },
  { pattern: [Direction.SW], repeats: true },
  { pattern: [Direction.NW], repeats: true },
];

const KNIGHT_GAITS: Gait[] = NonDiagonalDirections.map((A) =>
  knightTurnDirections(A).map((B) => [{ pattern: [A, A, B], nonBlocking: true }])
)
  .flat()
  .flat();

const QUEEN_GAITS: Gait[] = [...ROOK_GAITS, ...BISHOP_GAITS];

const KING_GAITS: Gait[] = [
  { pattern: [Direction.N] },
  { pattern: [Direction.NE] },
  { pattern: [Direction.E] },
  { pattern: [Direction.SE] },
  { pattern: [Direction.S] },
  { pattern: [Direction.SW] },
  { pattern: [Direction.W] },
  { pattern: [Direction.NW] },
];

const WHITE_PAWN_GAITS: Gait[] = [
  { pattern: [Direction.N], mustNotCapture: true },
  { pattern: [Direction.NE], mustCapture: true },
  { pattern: [Direction.NW], mustCapture: true },
];

const BLACK_PAWN_GAITS: Gait[] = [
  { pattern: [Direction.S], mustNotCapture: true },
  { pattern: [Direction.SE], mustCapture: true },
  { pattern: [Direction.SW], mustCapture: true },
];

export const standardGaits = {
  ROOK_GAITS,
  BISHOP_GAITS,
  KNIGHT_GAITS,
  QUEEN_GAITS,
  KING_GAITS,
  WHITE_PAWN_GAITS,
  BLACK_PAWN_GAITS,
};
