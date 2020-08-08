import { Gait } from "domain/Game/types";
import { Direction } from "domain/Game/Direction";

export const ROOK_GAITS: Gait[] = [
  { pattern: [Direction.N], repeats: true },
  { pattern: [Direction.E], repeats: true },
  { pattern: [Direction.S], repeats: true },
  { pattern: [Direction.W], repeats: true },
];

export const BISHOP_GAITS: Gait[] = [
  { pattern: [Direction.NE], repeats: true },
  { pattern: [Direction.SE], repeats: true },
  { pattern: [Direction.SW], repeats: true },
  { pattern: [Direction.NW], repeats: true },
];
export const KNIGHT_GAITS: Gait[] = [
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

export const QUEEN_GAITS: Gait[] = [...ROOK_GAITS, ...BISHOP_GAITS];

export const KING_GAITS: Gait[] = [
  { pattern: [Direction.N] },
  { pattern: [Direction.NE] },
  { pattern: [Direction.E] },
  { pattern: [Direction.SE] },
  { pattern: [Direction.S] },
  { pattern: [Direction.SW] },
  { pattern: [Direction.W] },
  { pattern: [Direction.NW] },
];

export const WHITE_PAWN_GATES: Gait[] = [{ pattern: [Direction.N] }];

export const BLACK_PAWN_GATES: Gait[] = [{ pattern: [Direction.S] }];
