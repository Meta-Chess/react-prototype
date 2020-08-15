import { Direction } from "./Direction";
import { Piece } from "./Board";

export type SquareAttributes = null;

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
  interuptable?: boolean;
  nonBlocking?: boolean;
  mustNotCapture?: boolean;
  mustCapture?: boolean;
}

type Chainable<T> = (input: T) => T;
type Action<T> = (input: T) => void;

export interface Variant {
  postMove?: Action<{ piecesMoved: Piece[] }>;
  onGaitsGeneratedModify?: Chainable<{ gaits: Gait[]; piece: Piece }>;
  onPieceGeneratedModify?: Chainable<{ piece: Piece }>;
}

export enum Player {
  White,
  Black,
}

export type Adjacencies = {
  [key in Direction]?: string[]; // TODO: Make location type
};

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
