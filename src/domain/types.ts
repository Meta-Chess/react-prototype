export interface State {
  pieces: Piece[];
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
  Black = "#202020",
  White = "#fcfcfc",
}

export interface Coordinates {
  x: number;
  y: number;
}
