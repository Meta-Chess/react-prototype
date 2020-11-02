import { Board, Piece, Square } from "../Board";
import { Direction, Move, Gait } from "game/types";

type Chainable<T> = (input: T) => T;
type Action<T> = (input: T) => void;

export interface Rule {
  afterStepModify?: Chainable<{
    gait: Gait;
    remainingSteps: Direction[];
    currentSquare: Square;
  }>;
  forSquareGenerationModify?: Chainable<{ board: Board }>;
  generateSpecialMoves?: Chainable<{
    board: Board;
    piece: Piece;
    rules: Rule[];
    moves: Move[];
  }>;
  onGaitsGeneratedModify?: Chainable<{ gaits: Gait[]; piece: Piece }>;
  onPieceGeneratedModify?: Chainable<{ piece: Piece }>;
  onBoardCreatedModify?: Chainable<{ board: Board }>;
  postMove?: Action<{ board: Board; move: Move; currentTurn: number }>;
}
