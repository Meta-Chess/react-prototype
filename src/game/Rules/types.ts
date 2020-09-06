import { Board, Piece, Square } from "../Board";
import { Direction, Move, Gait, Player } from "game/types";

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
  postMove?: Action<{ move: Move }>;
  inCanStayFilter?: Chainable<{
    move: Move;
    board: Board;
    rules: Rule[];
    patherParams: { checkDepth?: number };
    filtered: boolean;
  }>;
  lethalCondition?: Chainable<{
    board: Board;
    player: Player;
    dead: boolean;
  }>;
}
