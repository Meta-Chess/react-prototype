import { Board, Piece, Square } from "../Board";
import { Direction } from "game/types";
import { Gait } from "../types/types";

type Chainable<T> = (input: T) => T;
type Action<T> = (input: T) => void;

export interface Rule {
  postMove?: Action<{ piecesMoved: Piece[] }>;
  onGaitsGeneratedModify?: Chainable<{ gaits: Gait[]; piece: Piece }>;
  onPieceGeneratedModify?: Chainable<{ piece: Piece }>;
  afterStepModify?: Chainable<{
    gait: Gait;
    remainingSteps: Direction[];
    currentSquare: Square;
  }>;
  onBoardCreatedModify?: Chainable<{ board: Board }>;
  forSquareGenerationModify?: Chainable<{ board: Board }>;
}
