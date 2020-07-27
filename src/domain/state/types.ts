import { Direction } from "./Direction";
import { GameState } from "./GameState";

export interface PieceInterface {
  location: SquareInterface;
  type: PieceType;
  moveGenerators: MoveGenerator[];
  owner: Player;
  attributes: PieceAttributes;
}

export interface SquareInterface {
  adjacencies: Adjacencies;
  pieces: PieceInterface[];
  attributes: SquareAttributes;
}

export type PieceAttributes = null;

export type SquareAttributes = null;

export type MoveGenerator = (gameState: GameState) => Move[]; // TODO: change to a map from end square to move, maybe via other things

export type Move = PieceDelta[];

export interface PieceDelta {
  piece: PieceInterface;
  destination: SquareInterface;
  newAttributes: Partial<PieceAttributes>;
}

export enum MovePatternType {}

export enum Player {
  Black = "#404040",
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
