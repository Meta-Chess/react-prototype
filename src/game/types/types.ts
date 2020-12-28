import { ReactElement } from "react";
import { Direction } from "./Direction";
import { Piece, Rule, VariantName } from "game";
import { TraitName } from "game/variants";

export interface GaitData {
  interceptable?: boolean;
  interceptionCondition?: (piece: Piece) => boolean;
}

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
  interruptable?: boolean;
  nonBlocking?: boolean;
  mustNotCapture?: boolean;
  mustCapture?: boolean;
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

export const PlayerDisplayNames: { [key in PlayerName]: string } = {
  [PlayerName.White]: "White",
  [PlayerName.Black]: "Black",
  [PlayerName.Silver]: "Silver",
  [PlayerName.Gold]: "Gold",
  [PlayerName.Blue]: "Blue",
  [PlayerName.Red]: "Red",
  [PlayerName.Yellow]: "Yellow",
  [PlayerName.Green]: "Green",
};

export enum PieceName {
  Pawn,
  Rook,
  King,
  Queen,
  Bishop,
  Knight,
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
}

interface TokenData {
  history?: string[];
  shape?: SquareShape;
  pieceId?: string;
  condition?: (piece: Piece) => boolean;
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
  variant?: VariantName;
  customTitle?: string;
  customRules?: Rule[];
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

export interface AnimationData {
  duration: number;
  type: string;
  locations: { [id in string]: undefined };
}
