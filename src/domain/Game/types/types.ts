import { Direction } from "./Direction";

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
  interruptable?: boolean;
  nonBlocking?: boolean;
  mustNotCapture?: boolean;
  mustCapture?: boolean;
}

export enum Player {
  White,
  Black,
}

export type Location = string;

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
  validTo: { player: Player; playerTurn: number } | undefined;
  data: undefined | MoveHistoryData;
}

export enum TokenName {
  PawnDoubleStep,
  PolarToken,
  MoveHistory,
  InvisibilityToken,
}

export interface MoveHistoryData {
  history: string[];
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
