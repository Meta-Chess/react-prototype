import { Direction } from "./Direction";
import { Piece } from "./Board";

export type PieceAttributes = {
  pawnDoubleStep?: boolean;
};

export type SquareAttributes = null;

export interface Gait {
  pattern: Direction[];
  repeats?: boolean;
  interuptable?: boolean;
  nonBlocking?: boolean;
  mustNotCapture?: boolean;
  mustCapture?: boolean;
}

interface PostMoveInput {
  piecesMoved: Piece[];
}
interface OnGateGenerateInput {
  gaits: Gait[];
  piece: Piece;
}

export interface Variant {
  postMove?: ({ piecesMoved }: PostMoveInput) => void;
  onGaitGenerate?: (input: OnGateGenerateInput) => OnGateGenerateInput;
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
  pawnDoubleStep?: boolean;
}
