import { ReactElement } from "react";
import { Direction } from "./Direction";
import { Piece, VariantName, RuleName } from "game";
import { TraitName } from "game/variants/traitInfo";
import { getValues } from "utilities";

export interface GaitData {
  interceptable?: boolean;
  interceptionCondition?: (piece: Piece) => boolean;
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

export enum PieceName {
  Pawn,
  Rook,
  King,
  Queen,
  Bishop,
  Knight,
}

export enum AccessMarker {
  Normal,
}

export interface GaitParams {
  tokens: Token[];
}

export interface Token {
  name: TokenName;
  expired: (turn: number) => boolean;
  data: undefined | TokenData;
}

export enum TokenName {
  PawnDoubleStep,
  PolarToken,
  MoveHistory,
  InvisibilityToken,
  Shape,
  ActiveCastling,
  PassiveCastling,
  CaptureToken,
  Fatigue,
  AnimationToken,
  CheckCounter,
}

export enum AnimationType {
  explosion = "explosion",
}

export enum PieceAnimationType {
  chemicallyExcited = "chemicallyExcited",
}
interface TokenData {
  history?: string[];
  shape?: SquareShape;
  pieceId?: string;
  condition?: (piece: Piece) => boolean;
  type?: AnimationType;
  createdAt?: number;
  duration?: number;
  delay?: number;
  id?: number;
  counters?: number[];
  pieceVisualData?: PieceVisualData;
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
}

export interface GameOptions {
  numberOfPlayers?: number;
  variant?: VariantName;
  customTitle?: string;
  customRuleNames?: RuleName[];
  time?: number | undefined;
  checkEnabled?: boolean;
  flipBoard?: boolean;
  overTheBoard?: boolean;
  roomId?: string;
  online?: boolean;
  fatigueEnabled?: boolean;
  atomicEnabled?: boolean;
}

export interface Modal {
  id: number;
  top?: number;
  left?: number;
  content?: ReactElement;
  fullScreen?: boolean;
}

export interface TraitsInSetInfo {
  name: TraitName;
  count: number;
}

export enum Region {
  center = "center",
  promotion = "promotion",
}

export type Regions = { [key in Region]?: string[] };

export type Location = string;

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
