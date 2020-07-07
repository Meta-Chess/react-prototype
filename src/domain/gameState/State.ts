import { Coordinates, State } from "domain/types";

export const livePiecesAt = (location: Coordinates, state: State) => {
  return state.pieces
    .filter((p) => p.location.x === location.x && p.location.y === location.y)
    .filter((p) => p.alive);
};
