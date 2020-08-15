import { Piece } from "../Board";
import { Gait } from "./types";

type Chainable<T> = (input: T) => T;
type Action<T> = (input: T) => void;

export interface Variant {
  postMove?: Action<{ piecesMoved: Piece[] }>;
  onGaitsGeneratedModify?: Chainable<{ gaits: Gait[]; piece: Piece }>;
  onPieceGeneratedModify?: Chainable<{ piece: Piece }>;
}
