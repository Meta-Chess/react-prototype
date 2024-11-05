import { Direction } from "game/types";

export function rotate180(pattern: Direction[]): Direction[] {
  return pattern.map((direction) => {
    switch (direction) {
      case Direction.N:
        return Direction.S;
      case Direction.NE:
        return Direction.SW;
      case Direction.E:
        return Direction.W;
      case Direction.SE:
        return Direction.NW;
      case Direction.S:
        return Direction.N;
      case Direction.SW:
        return Direction.NE;
      case Direction.W:
        return Direction.E;
      case Direction.NW:
        return Direction.SE;
      case Direction.H1:
        return Direction.H7;
      case Direction.H2:
        return Direction.H8;
      case Direction.H3:
        return Direction.H9;
      case Direction.H4:
        return Direction.H10;
      case Direction.H5:
        return Direction.H11;
      case Direction.H6:
        return Direction.H12;
      case Direction.H7:
        return Direction.H1;
      case Direction.H8:
        return Direction.H2;
      case Direction.H9:
        return Direction.H3;
      case Direction.H10:
        return Direction.H4;
      case Direction.H11:
        return Direction.H5;
      case Direction.H12:
        return Direction.H6;
      case Direction.Down:
        return Direction.Down;
      default:
        return direction;
    }
  });
}
