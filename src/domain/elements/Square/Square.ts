import { Color, Coordinates, Square, State } from "domain/types";

export const squareColor = (location: Coordinates) =>
  isBlackSquare(location) ? "#41787c" : "#e4e0d3";

const isBlackSquare = ({ x, y }: Coordinates): boolean => (x - y) % 2 === 0;

export const isEmpty = (state: State, square: Square): boolean => {
  return (
    state.pieces
      .filter((p) => p.alive)
      .filter(
        (p) =>
          p.location.x === square.location.x &&
          p.location.y === square.location.y
      ).length === 0
  );
};

export const containsWhite = (state: State, square: Square): boolean => {
  return (
    state.pieces
      .filter((p) => p.alive)
      .filter((p) => p.color === Color.White)
      .filter(
        (p) =>
          p.location.x === square.location.x &&
          p.location.y === square.location.y
      ).length !== 0
  );
};

export const containsBlack = (state: State, square: Square): boolean => {
  return (
    state.pieces
      .filter((p) => p.alive)
      .filter((p) => p.color === Color.Black)
      .filter(
        (p) =>
          p.location.x === square.location.x &&
          p.location.y === square.location.y
      ).length !== 0
  );
};
