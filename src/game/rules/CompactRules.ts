import { isPresent } from "ts-is-present";
import { Direction, Gait, GaitParams, PieceName, PlayerName } from "../types";
import { applyInSequence } from "utilities";
import { Board, Piece, Square } from "../Board";
import { Game } from "game/Game";
import { Move, PieceDelta } from "game/Move";
import { EventCenter } from "game/EventCenter";
import { PatherParams } from "game/Pather";
import { GameMaster } from "game/GameMaster";
import { FutureVariantName } from "game/variants";
import { FormatName, formats as allFormats } from "game/formats";
import { RuleName, rules as allRules } from "game/rules";
import { variantsToRules } from "game/variantAndRuleProcessing/variantsToRules";
import { uniq } from "lodash";

// Note: These linting exceptions should only ever be used with great caution
// Take care to check extra carefully for errors in this file because we have less type safety
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export class CompactRules {
  public for: CompleteRule;
  private readonly ruleNames: RuleName[];

  constructor(
    variants: FutureVariantName[],
    formats: FormatName[] = [],
    otherRules: RuleName[] = []
  ) {
    // TODO: Combine rules from formats more neatly?
    this.ruleNames = uniq([
      ...variantsToRules(variants),
      ...formats.flatMap((f) => allFormats[f].ruleNames || []),
      ...otherRules,
    ]);

    const interruptionNames = Object.keys(identityRule) as InterruptionName[];

    const interruptionPoints = interruptionNames.map((interruptionPointName) => ({
      name: interruptionPointName,
      functions: this.ruleNames
        .filter((ruleName) => !!allRules[ruleName][interruptionPointName])
        .sort(compareRulesPerInterruptionPoint(interruptionPointName))
        .map((ruleName) => allRules[ruleName][interruptionPointName])
        .filter(isPresent),
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

  getRuleNames(): RuleName[] {
    return this.ruleNames;
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
  forSquareGenerationModify: (x: { board: Board; numberOfPlayers: number }) => x,
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
  formatControlAtTurnStart: (x: { gameMaster: GameMaster }) => x,
  inPostMoveGenerationFilter: (x: {
    move: Move;
    game: Game;
    gameClones: Game[];
    interrupt: CompactRules;
    patherParams: PatherParams;
    filtered: boolean;
  }) => x,
  lethalCondition: (x: { board: Board; player: PlayerName; dead: string | false }) => x,
  onBoardCreate: (x: { board: Board; numberOfPlayers: number }) => x,
  onSendPieceToGrave: (x: {
    piece: Piece;
    mover: PlayerName | undefined;
    captured: boolean;
    destination: string;
  }) => x,
  onGaitsGeneratedModify: (x: { gaits: Gait[]; piece: Piece }) => x,
  onPieceDisplaced: (x: { board: Board; pieceDelta: PieceDelta }) => x,
  onPieceGeneratedModify: (x: { piece: Piece }) => x,
  piecesUnderSquare: (x: { square: Square; board: Board; pieceIds: string[] }) => x,
  postCapture: (x: { board: Board; square: Square }) => x,
  postMove: (x: {
    game: Game;
    interrupt: CompactRules;
    board: Board;
    move: Move;
    currentTurn: number;
  }) => x,
  processMoves: (x: {
    moves: Move[];
    game: Game;
    gameClones: Game[];
    params: PatherParams;
  }) => x,
  subscribeToEvents: (x: { events: EventCenter }) => x,
  inFindPathsModifyInputParams: (x: { filterPacifistMoves: boolean }) => x,
};

export type CompleteRule = typeof identityRule;
type InterruptionName = keyof CompleteRule;
export type Rule = Partial<CompleteRule> & {
  title: string;
  description: string;
};

function compareRulesPerInterruptionPoint(
  name: InterruptionName
): (r1: RuleName, r2: RuleName) => number {
  const list = ruleOrderPerInterruptionPoint[name];
  if (list) return (r1, r2) => compareRulesByList(r1, r2, list);
  else return (r1, r2) => r1.localeCompare(r2);
}

function compareRulesByList(t1: string, t2: string, list: string[]): number {
  if (!list.includes("theRest")) return compareRulesByList(t1, t2, ["theRest", ...list]); //this prevents the possiblity of an infinite loop
  if (!list.includes(t1)) return compareRulesByList("theRest", t2, list);
  if (!list.includes(t2)) return compareRulesByList(t1, "theRest", list);

  return list.indexOf(t1) - list.indexOf(t2);
}

const ruleOrderPerInterruptionPoint: {
  [key in InterruptionName]?: (RuleName | "theRest")[];
} = {
  processMoves: ["pull", "theRest", "promotion"],
  lossCondition: ["theRest", "check", "threeCheck"],
  inPostMoveGenerationFilter: ["theRest", "check"],
  onPieceDisplaced: ["theRest", "promotion"],
};
