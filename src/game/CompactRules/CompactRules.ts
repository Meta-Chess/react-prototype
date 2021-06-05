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
import { RuleName, rules as allRules } from "game/CompactRules";
import { variantsToRules } from "game/variantAndRuleProcessing/variantsToRules";
import { RuleParamValue, RuleSetting } from "./RuleSettingTypes";
import { uniq } from "lodash";
import { keys } from "utilities";

// Note: These linting exceptions should only ever be used with great caution
// Take care to check extra carefully for errors in this file because we have less type safety
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export class CompactRules {
  public for: CompleteRule;
  private ruleNames: RuleName[];
  private ruleParams: RuleNamesWithParams;

  constructor(
    variants: FutureVariantName[],
    formats: FormatName[] = [],
    otherRules: RuleName[] = [],
    ruleParams: RuleNamesWithParams = {}
  ) {
    // TODO: Combine rules from formats more neatly?
    this.ruleNames = uniq([
      ...variantsToRules(variants),
      ...formats.flatMap((f) => allFormats[f].ruleNames || []),
      ...otherRules,
    ]);
    this.ruleParams = ruleParams;

    const interruptionNames = keys(identityRule);

    const interruptionPoints = interruptionNames.map((interruptionPointName) => ({
      name: interruptionPointName,
      functions: this.ruleNames
        .filter(
          (ruleName) =>
            !!allRules[ruleName](ruleParams?.[ruleName])[interruptionPointName]
        )
        .sort(compareRulesPerInterruptionPoint(interruptionPointName))
        .map(
          (ruleName) => allRules[ruleName](ruleParams?.[ruleName])[interruptionPointName]
        )
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
  getRuleParams(): RuleNamesWithParams {
    return this.ruleParams;
  }

  clone(): CompactRules {
    return new CompactRules([], [], this.getRuleNames(), this.getRuleParams());
  }

  resetTo(savePoint: CompactRules): void {
    this.constructor([], [], savePoint.getRuleNames(), this.getRuleParams());
  }
}

const identityRule = {
  afterBoardCreation: (x: AfterBoardCreation) => x,
  afterGameCreation: (x: AfterGameCreation) => x,
  afterStepModify: (x: AfterStepModify) => x,
  getGaitGenerator: (x: GetGaitGenerator) => x,
  forSquareGenerationModify: (x: ForSquareGenerationModify) => x,
  generateSpecialPacifistMoves: (x: GenerateSpecialPacifistMoves) => x,
  lossCondition: (x: LossCondition) => x,
  drawCondition: (x: DrawCondition) => x,
  formatControlAtTurnStart: (x: FormatControlAtTurnStart) => x,
  inPostMoveGenerationFilter: (x: InPostMoveGenerationFilter) => x,
  lethalCondition: (x: LethalCondition) => x,
  onBoardCreate: (x: OnBoardCreate) => x,
  onSendPieceToGrave: (x: OnSendPieceToGrave) => x,
  onGaitsGeneratedModify: (x: OnGaitsGeneratedModify) => x,
  onPieceDisplaced: (x: OnPieceDisplaced) => x,
  onPieceGeneratedModify: (x: OnPieceGeneratedModify) => x,
  piecesUnderSquare: (x: PiecesUnderSquare) => x,
  postCapture: (x: PostCapture) => x,
  postMove: (x: PostMove) => x,
  processMoves: (x: ProcessMoves) => x,
  subscribeToEvents: (x: SubscribeToEvents) => x,
  inFindPathsModifyInputParams: (x: InFindPathsModifyInputParams) => x,
};

export type CompleteRule = typeof identityRule;
type InterruptionName = keyof CompleteRule;

export type Rule = Partial<CompleteRule> & {
  title: string;
  description: string;
};
export type ParameterRule = (ruleParams?: RuleParamValue) => Rule;

export type RuleNamesWithParams = { [k in RuleName]?: RuleParamValue };
export type RuleNamesWithParamSettings = { [k in RuleName]?: RuleSetting };

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
  processMoves: ["pull", "theRest", "promotion", "chainReaction"],
  lossCondition: ["theRest", "check", "threeCheck"],
  inPostMoveGenerationFilter: ["theRest", "check"],
  onPieceDisplaced: ["theRest", "promotion"],
};

export interface AfterBoardCreation {
  board: Board;
}

export interface AfterGameCreation {
  game: Game;
}

export interface AfterStepModify {
  gait: Gait;
  remainingSteps: Direction[];
  currentSquare: Square;
}

export interface AfterStepModify {
  gait: Gait;
  remainingSteps: Direction[];
  currentSquare: Square;
}

export interface GetGaitGenerator {
  gaitGenerator?: (_?: GaitParams) => Gait[];
  name: PieceName;
  owner?: PlayerName;
}

export interface ForSquareGenerationModify {
  board: Board;
  numberOfPlayers: number;
}

export interface GenerateSpecialPacifistMoves {
  game: Game;
  piece: Piece;
  interrupt: CompactRules;
  moves: Move[];
}

export interface LossCondition {
  playerName: PlayerName;
  game: Game;
  gameClones: Game[];
  interrupt: CompactRules;
  dead: string | false;
}

export interface DrawCondition {
  game: Game;
  gameClones: Game[];
  interrupt: CompactRules;
  draw: string | false;
}

export interface FormatControlAtTurnStart {
  gameMaster: GameMaster;
}

export interface InPostMoveGenerationFilter {
  move: Move;
  game: Game;
  gameClones: Game[];
  interrupt: CompactRules;
  patherParams: PatherParams;
  filtered: boolean;
}

export interface LethalCondition {
  board: Board;
  player: PlayerName;
  dead: string | false;
}

export interface OnBoardCreate {
  board: Board;
  numberOfPlayers: number;
}

export interface OnSendPieceToGrave {
  piece: Piece;
  mover: PlayerName | undefined;
  captured: boolean;
  destination: string;
}

export interface OnGaitsGeneratedModify {
  gaits: Gait[];
  piece: Piece;
}

export interface OnPieceDisplaced {
  board: Board;
  pieceDelta: PieceDelta;
}

export interface OnPieceGeneratedModify {
  piece: Piece;
}

export interface PiecesUnderSquare {
  square: Square;
  board: Board;
  pieceIds: string[];
}

export interface PostCapture {
  board: Board;
  square: Square;
}

export interface PostMove {
  game: Game;
  interrupt: CompactRules;
  board: Board;
  move?: Move;
  currentTurn: number;
}

export interface ProcessMoves {
  moves: Move[];
  game: Game;
  gameClones: Game[];
  params: PatherParams;
}

export interface SubscribeToEvents {
  events: EventCenter;
}

export interface InFindPathsModifyInputParams {
  filterPacifistMoves: boolean;
}
