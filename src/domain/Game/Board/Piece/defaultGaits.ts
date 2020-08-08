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
  { pattern: [Direction.N, Direction.N, Direction.E] },
  { pattern: [Direction.E, Direction.N, Direction.N] },
  { pattern: [Direction.N, Direction.N, Direction.W] },
  { pattern: [Direction.W, Direction.N, Direction.N] },
  { pattern: [Direction.E, Direction.E, Direction.S] },
  { pattern: [Direction.S, Direction.E, Direction.E] },
  { pattern: [Direction.E, Direction.E, Direction.N] },
  { pattern: [Direction.N, Direction.E, Direction.E] },
  { pattern: [Direction.S, Direction.S, Direction.E] },
  { pattern: [Direction.E, Direction.S, Direction.S] },
  { pattern: [Direction.S, Direction.S, Direction.W] },
  { pattern: [Direction.W, Direction.S, Direction.S] },
  { pattern: [Direction.W, Direction.W, Direction.S] },
  { pattern: [Direction.S, Direction.W, Direction.W] },
  { pattern: [Direction.W, Direction.W, Direction.N] },
  { pattern: [Direction.N, Direction.W, Direction.W] },
];

export const QUEEN_GAITS: Gait[] = [...ROOK_GAITS, ...BISHOP_GAITS];
