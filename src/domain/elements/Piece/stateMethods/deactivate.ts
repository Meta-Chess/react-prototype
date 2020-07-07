import { Piece, State } from "domain/types";
import update from "immutability-helper";

export const deactivate = (state: State, piece: Piece): State => {
  const pieceIndex = state.pieces.findIndex((p) => p.id === piece.id);
  return update(state, {
    pieces: { [pieceIndex]: { active: { $set: false } } },
  });
};
