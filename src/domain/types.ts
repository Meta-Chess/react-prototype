import { Phase } from "./gamePhase";
import { PopUpEnum } from "domain/elements/PopUp";

export interface State {
  pieces: Piece[];
  phase: Phase;
  phases: Phase[];
  popUp?: PopUp;
}

export type SetState = (state: State) => void;

export interface Piece {
  id: number;
  type: PieceType;
  color: Color;
  location: Coordinates;
  active: string | false;
  alive: boolean;
}

export interface Square {
  location: Coordinates;
}

export interface PopUp {
  component: PopUpEnum;
  meta: PopUpMeta;
}

export interface PopUpMeta {
  piece?: Piece;
}

export enum PieceType {
  Pawn = "Pawn",
  Rook = "Rook",
  Knight = "Knight",
  Bishop = "Bishop",
  Queen = "Queen",
  King = "King",
}

export enum Color {
  Black = "#404040",
  White = "#fcfcfc",
}

export interface Coordinates {
  x: number;
  y: number;
}
