import { Piece, Square, Board } from "../Board";
import { Direction } from "./Direction";
import { Gait } from "./types";

type Chainable<T> = (input: T) => T;
type Action<T> = (input: T) => void;

export interface Variant {
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
