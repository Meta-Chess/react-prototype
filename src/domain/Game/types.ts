import { Direction } from "./Direction";

export type PieceAttributes = null;

export type SquareAttributes = null;

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
}

export enum Player {
  Black = "#606060",
  White = "#FFFFFF",
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
