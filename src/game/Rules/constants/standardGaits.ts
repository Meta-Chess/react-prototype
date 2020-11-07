import { Gait } from "game/types";
import { Direction } from "game/types";

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
const KNIGHT_GAITS: Gait[] = [
  { pattern: [Direction.N, Direction.N, Direction.E], nonBlocking: true },
  { pattern: [Direction.E, Direction.N, Direction.N], nonBlocking: true },
  { pattern: [Direction.N, Direction.N, Direction.W], nonBlocking: true },
  { pattern: [Direction.W, Direction.N, Direction.N], nonBlocking: true },
  { pattern: [Direction.E, Direction.E, Direction.S], nonBlocking: true },
  { pattern: [Direction.S, Direction.E, Direction.E], nonBlocking: true },
  { pattern: [Direction.E, Direction.E, Direction.N], nonBlocking: true },
  { pattern: [Direction.N, Direction.E, Direction.E], nonBlocking: true },
  { pattern: [Direction.S, Direction.S, Direction.E], nonBlocking: true },
  { pattern: [Direction.E, Direction.S, Direction.S], nonBlocking: true },
  { pattern: [Direction.S, Direction.S, Direction.W], nonBlocking: true },
  { pattern: [Direction.W, Direction.S, Direction.S], nonBlocking: true },
  { pattern: [Direction.W, Direction.W, Direction.S], nonBlocking: true },
  { pattern: [Direction.S, Direction.W, Direction.W], nonBlocking: true },
  { pattern: [Direction.W, Direction.W, Direction.N], nonBlocking: true },
  { pattern: [Direction.N, Direction.W, Direction.W], nonBlocking: true },
];

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
