import { Piece, State } from "domain/types";
import * as Pieces from "domain/elements/Piece";

export const activate = (state: State, piece: Piece): State => {
  return Pieces.activate(state, piece);
};

export const deactivate = (state: State, piece: Piece): State => {
  return Pieces.deactivate(state, piece);
};
