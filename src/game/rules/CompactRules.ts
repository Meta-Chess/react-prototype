import { isPresent } from "ts-is-present";
import { Direction, Gait, GaitParams, PieceName, PlayerName } from "../types";
import { applyInSequence } from "utilities";
import { Board, Piece, Square } from "../Board";
import { Game } from "game/Game";
import { Move, PieceDelta } from "game/Move";

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
  afterGameCreation: (x: { game: Game }) => x,
  afterStepModify: (x: {
    gait: Gait;
    remainingSteps: Direction[];
    currentSquare: Square;
  }) => x,
  getGaitGenerator: (x: {
    gaitGenerator?: (_?: GaitParams) => Gait[];
    name: PieceName;
    owner?: PlayerName;
  }) => x,
  forSquareGenerationModify: (x: { board: Board }) => x,
  generateSpecialPacifistMoves: (x: {
    game: Game;
    piece: Piece;
    interrupt: CompactRules;
    moves: Move[];
  }) => x,
  lossCondition: (x: {
    playerName: PlayerName;
    game: Game;
    gameClones: Game[];
    interrupt: CompactRules;
    dead: string | false;
  }) => x,
  drawCondition: (x: {
    game: Game;
    gameClones: Game[];
    interrupt: CompactRules;
    draw: string | false;
  }) => x,
  inPostMoveGenerationFilter: (x: {
    move: Move;
    game: Game;
    gameClones: Game[];
    interrupt: CompactRules;
    patherParams: { checkDepth?: number };
    filtered: boolean;
  }) => x,
  lethalCondition: (x: { board: Board; player: PlayerName; dead: string | false }) => x,
  moveIsAggressive: (x: { board: Board; move: Move; aggressive: boolean }) => x,
  onBoardCreate: (x: { board: Board }) => x,
  onCapture: (x: {
    board: Board;
    piece: Piece;
    location: string;
    captureHappened: boolean;
  }) => x,
  onGaitsGeneratedModify: (x: { gaits: Gait[]; piece: Piece }) => x,
  onPieceDisplaced: (x: { board: Board; pieceDelta: PieceDelta }) => x,
  onPieceGeneratedModify: (x: { piece: Piece }) => x,
  piecesUnderSquare: (x: { square: Square; board: Board; pieceIds: string[] }) => x,
  postCapture: (x: { board: Board; square: Square }) => x,
  postMove: (x: { board: Board; move: Move; currentTurn: number }) => x,
  processMoves: (x: { board: Board; moves: Move[] }) => x,
};

export type CompleteRule = typeof identityRule;
type InterruptionName = keyof CompleteRule;
export type Rule = Partial<CompleteRule> & {
  title: string;
  description: string;
};
