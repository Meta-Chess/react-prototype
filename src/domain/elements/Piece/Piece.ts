//
//
//  TODO: DEPRECATED
//
//

import { Coordinates, Piece } from "domain/types";
import update from "immutability-helper";

export const killPiecesOnSquare = (
  pieces: Piece[],
  location: Coordinates
): Piece[] =>
  pieces.map((p) => {
    if (p.location.x === location.x && p.location.y === location.y) {
      return update(p, {
        alive: { $set: false },
      });
    }
    return p;
  });

export const moveActivePieces = (
  pieces: Piece[],
  location: Coordinates
): Piece[] =>
  pieces.map((p) => {
    if (p.active) {
      return update(p, {
        location: { $set: location },
        active: { $set: false },
      });
    }
    return p;
  });
