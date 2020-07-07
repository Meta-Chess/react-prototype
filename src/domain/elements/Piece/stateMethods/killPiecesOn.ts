import { Piece, Square, State } from "domain/types";
import update from "immutability-helper";

export const killPiecesOn = (state: State, square: Square): State => {
  // TODO: Neaten
  return update(state, {
    pieces: {
      $apply: (pieces: Piece[]): Piece[] => {
        return pieces.map((piece) => {
          if (
            piece.location.x === square.location.x &&
            piece.location.y === square.location.y
          ) {
            return update(piece, {
              alive: { $set: false },
            });
          }
          return piece;
        });
      },
    },
  });
};
