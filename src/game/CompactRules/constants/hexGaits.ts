import { Gait } from "game/types";
import { Direction } from "game/types";

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
    case Direction.TC1:
      return [Direction.TE2, Direction.TE3];
    case Direction.TC2:
      return [Direction.TE1, Direction.TE3];
    case Direction.TC3:
      return [Direction.TE1, Direction.TE2];
    case Direction.TE1:
      return [Direction.TC2, Direction.TC3];
    case Direction.TE2:
      return [Direction.TC1, Direction.TC3];
    case Direction.TE3:
      return [Direction.TC1, Direction.TC2];
    case Direction.TH1:
      return [Direction.TH6, Direction.TH1];
    case Direction.TH2:
      return [Direction.TH1, Direction.TH3];
    case Direction.TH3:
      return [Direction.TH2, Direction.TH4];
    case Direction.TH4:
      return [Direction.TH3, Direction.TH5];
    case Direction.TH5:
      return [Direction.TH4, Direction.TH6];
    case Direction.TH6:
      return [Direction.TH5, Direction.TH1];
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
  knightTurnDirections(A).map((B) => [{ pattern: [A, A, B], nonBlocking: true }])
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

const BLACK_PAWN_GAITS: Gait[] = [
  { pattern: [Direction.H6], mustNotCapture: true },
  { pattern: [Direction.H4], mustCapture: true },
  { pattern: [Direction.H8], mustCapture: true },
];

export const hexGaits = {
  ROOK_GAITS,
  BISHOP_GAITS,
  KNIGHT_GAITS,
  QUEEN_GAITS,
  KING_GAITS,
  WHITE_PAWN_GAITS,
  BLACK_PAWN_GAITS,
};
