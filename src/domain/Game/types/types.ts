import { Direction } from "./Direction";

export type SquareAttributes = null;

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
  interuptable?: boolean;
  nonBlocking?: boolean;
  mustNotCapture?: boolean;
  mustCapture?: boolean;
}

export enum Player {
  White,
  Black,
}

export type Location = string;

export enum PieceType {
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
  MoveHistory,
}

export interface MoveHistoryData {
  history: string[];
}
