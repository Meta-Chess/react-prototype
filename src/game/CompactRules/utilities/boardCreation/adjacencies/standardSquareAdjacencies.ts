import { toLocation } from "utilities";
import { Adjacency, Square } from "game/Board";
import { Direction, RankAndFileBounds } from "game/types";

export const standardSquareAdjacencies =
  (_bounds: RankAndFileBounds) =>
  (square: Square): Adjacency[] => {
    const { rank, file } = square.getCoordinates();
    return [
      { direction: Direction.N, location: toLocation({ rank: rank + 1, file }) },
      {
        direction: Direction.NE,
        location: toLocation({ rank: rank + 1, file: file + 1 }),
      },
      { direction: Direction.E, location: toLocation({ rank, file: file + 1 }) },
      {
        direction: Direction.SE,
        location: toLocation({ rank: rank - 1, file: file + 1 }),
      },
      { direction: Direction.S, location: toLocation({ rank: rank - 1, file }) },
      {
        direction: Direction.SW,
        location: toLocation({ rank: rank - 1, file: file - 1 }),
      },
      { direction: Direction.W, location: toLocation({ rank, file: file - 1 }) },
      {
        direction: Direction.NW,
        location: toLocation({ rank: rank + 1, file: file - 1 }),
      },
    ];
  };
