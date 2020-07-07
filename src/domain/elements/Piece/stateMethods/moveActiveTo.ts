import { Piece, Square, State } from "domain/types";
import update from "immutability-helper";

export const moveActiveTo = (state: State, square: Square): State => {
  // TODO: Neaten
  return update(state, {
    pieces: {
      $apply: (pieces: Piece[]): Piece[] => {
        return pieces.map((piece) => {
          if (piece.active) {
            return update(piece, {
              location: { $set: square.location },
              active: { $set: false },
            });
          }
          return piece;
        });
      },
    },
  });
};
