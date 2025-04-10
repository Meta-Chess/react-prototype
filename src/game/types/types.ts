import { ReactElement } from "react";
import { Direction } from "./Direction";
import { FutureVariantName, Piece, VariantName } from "game";
import { FormatName } from "game/formats";
import { getValues } from "utilities";
import { RuleNamesWithParams } from "game/CompactRules";
import {
  InterceptionCondition,
  InterceptionConditionType,
  InterceptionConditionBuilderParams,
} from "game/types/InterceptionCondition";

export interface GaitData {
  interceptable?: boolean;
  interceptionConditionType?: InterceptionConditionType;
  interceptionConditionBuilderParams?: InterceptionConditionBuilderParams;
  linearMoverDirection?: Direction;
}

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
  interruptable?: boolean;
  nonBlocking?: boolean;
  mustNotCapture?: boolean;
  mustCapture?: boolean;
  phaser?: boolean;
  data?: GaitData;
}

export type TimestampMillis = number;
export type IntervalMillis = number;

// The order of colors in this enum corresponds to the order of colors in Colors.PLAYER
export enum PlayerName {
  White,
  Black,
  Silver,
  Gold,
  Blue,
  Red,
  Yellow,
  Green,
}

export const allPossiblePlayerNames = getValues<PlayerName>(PlayerName);

export type PlayerAssignment = PlayerName | "spectator" | "all";

export enum PieceName {
  Pawn,
  Rook,
  King,
  Queen,
  Bishop,
  Knight,
  BishopKnight,
  RookKnight,
  FirePiece,
  WaterPiece,
  EarthPiece,
  LightningPiece,
}

export const allPossiblePieceNames = getValues<PieceName>(PieceName);

export enum AccessMarker {
  Normal,
}

export interface GaitParams {
  tokens: Token[];
}

export enum TokenName {
  PawnDoubleStep,
  PolarToken,
  MoveHistory,
  InvisibilityToken,
  Shape,
  ActiveCastling,
  PassiveCastling,
  Extinction,
  CaptureToken,
  Fatigue,
  AnimationToken,
  CheckCounter,
  ThinIce,
  Puppeteered,
  InterceptionPossible,
  Nimbus,
  NimbusPieceCannotPromote,
}

export interface Token {
  name: TokenName;
  expired: (turn: number) => boolean;
  data: undefined | TokenData;
}

export enum AnimationType {
  explosion = "explosion",
}

export enum PieceAnimationType {
  chemicallyExcited = "chemicallyExcited",
}

interface TokenData {
  turnNumber?: number;
  handoverTurnNumber?: number;
  history?: string[];
  shape?: SquareShape;
  pieceId?: string;
  condition?: InterceptionCondition;
  type?: AnimationType; // TODO: type is a special word, maybe this key should be animationType?
  createdAt?: number;
  duration?: number;
  delay?: number;
  id?: number;
  counters?: number[];
  pieceVisualData?: PieceVisualData;
  extinctionData?: PieceName[][];
  thinIceData?: number;
}

export interface PieceVisualData {
  piece: Piece;
  positionOnSquare: number;
  pieceAnimationType: PieceAnimationType;
  bodyColorChange?: string;
  outlineColorChange?: string;
}

export interface RankAndFileBounds {
  minRank: number;
  maxRank: number;
  minFile: number;
  maxFile: number;
}

export enum SquareShape {
  Square,
  Hex,
  Arc,
  Triangle,
}

export interface GameOptions {
  numberOfPlayers: number;
  players?: PlayerName[]; // The back end cares about this variable and its name!
  variant?: VariantName;
  customTitle?: string;
  time?: number | undefined;
  checkEnabled?: boolean;
  flipBoard?: boolean;
  overTheBoard?: boolean;
  roomId?: string;
  online?: boolean;
  publicGame?: boolean; // The back end cares about this variable and its name!
  spotlight?: boolean;
  baseVariants: FutureVariantName[];
  deck?: FutureVariantName[];
  format: FormatName;
  formatData?: FormatData;
  ruleNamesWithParams?: RuleNamesWithParams;
}

export interface FormatData {
  period?: number;
}

export interface Modal {
  id: number;
  top?: number;
  left?: number;
  content?: ReactElement;
  fullScreen?: boolean;
}

const allRegions = ["center", "promotion"] as const;
export type Region = typeof allRegions[number];

export type Regions = {
  [key in Region]: {
    [key in PlayerName | "default"]?: string[];
  };
};

export const defaultRegions = allRegions.reduce(
  (acc, r) => ({ ...acc, [r]: {} }),
  {}
) as Regions;

export type Location = string;

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export enum VariantLabelInfo {
  VariantLeaving,
  NewVariant,
}

export type Point = { x: number; y: number };
export type Degrees = number;
