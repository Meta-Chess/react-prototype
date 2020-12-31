import { Direction, Gait, Move, PlayerName } from "../types";
import { applyInSequence, isPresent } from "utilities";
import { Board, Piece, Square } from "../Board";
import { Game } from "game/Game";

// Note: These linting exceptions should only ever be used with great caution
// Take care to check extra carefully for errors in this file because we have less type safety
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export class CompactRules {
  public for: CompleteRule;

  constructor(rules: Rule[]) {
    const interruptionNames = Object.keys(identityRule) as InterruptionName[];

    const interruptionPoints = interruptionNames.map((name) => ({
      name,
      functions: rules.map((r) => r[name]).filter(isPresent),
    }));

    this.for = interruptionPoints.reduce(
      (acc, interruptionPoint) => ({
        ...acc,
        [interruptionPoint.name]: (input: any): any =>
          applyInSequence(interruptionPoint.functions as ((x: any) => any)[], input),
      }),
      {}
    ) as CompleteRule;
  }
}

const identityRule = {
  afterBoardCreation: (x: { board: Board }) => x,
  afterStepModify: (x: {
    gait: Gait;
    remainingSteps: Direction[];
    currentSquare: Square;
  }) => x,
  forSquareGenerationModify: (x: { board: Board }) => x,
  generateSpecialMoves: (x: {
    game: Game;
    piece: Piece;
    interrupt: CompactRules;
    moves: Move[];
  }) => x,
  inCanStayFilter: (x: {
    move: Move;
    game: Game;
    gameClones: Game[];
    interrupt: CompactRules;
    patherParams: { checkDepth?: number };
    filtered: boolean;
  }) => x,
  lethalCondition: (x: { board: Board; player: PlayerName; dead: boolean }) => x,
  onBoardCreate: (x: { board: Board }) => x,
  onCapture: (x: {
    board: Board;
    piece: Piece;
    location: string;
    captureHappened: boolean;
  }) => x,
  onGaitsGeneratedModify: (x: { gaits: Gait[]; piece: Piece }) => x,
  onPieceGeneratedModify: (x: { piece: Piece }) => x,
  piecesUnderSquare: (x: { square: Square; board: Board; pieceIds: string[] }) => x,
  postCapture: (x: { board: Board; square: Square }) => x,
  postMove: (x: { board: Board; move: Move; currentTurn: number }) => x,
};

export type CompleteRule = typeof identityRule;
type InterruptionName = keyof CompleteRule;
export type Rule = Partial<CompleteRule> & {
  name: string;
  description: string;
};
