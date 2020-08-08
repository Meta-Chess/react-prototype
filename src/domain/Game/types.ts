import { Direction } from "./Direction";

export type PieceAttributes = {
  doubleStep?: boolean;
};

export type SquareAttributes = null;

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
  interuptable?: boolean;
  nonBlocking?: boolean;
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
  doubleStep?: boolean;
}
