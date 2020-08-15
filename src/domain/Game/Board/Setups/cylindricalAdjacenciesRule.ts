import { Direction } from "domain/Game/types";
import { Square } from "../Square";
import { Adjacency } from "../Adjacencies";

export const cylindricalAdjacenciesRule = (square: Square): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return file === 1
    ? [
        { direction: Direction.SW, location: `R${rank - 1}F${8}` },
        { direction: Direction.W, location: `R${rank}F${8}` },
        { direction: Direction.NW, location: `R${rank + 1}F${8}` },
      ]
    : file === 8
    ? [
        { direction: Direction.NE, location: `R${rank + 1}F${1}` },
        { direction: Direction.E, location: `R${rank}F${1}` },
        { direction: Direction.SE, location: `R${rank - 1}F${1}` },
      ]
    : [];
};
