import { range2, toLocation } from "utilities";
import { Square } from "game/Board/Square";

export const generateSquareGrid = (
  size: number
): { location: string; square: Square }[] =>
  range2(1, size, 1, size)
    .flat()
    .map(({ x, y }) => {
      const location = toLocation({ rank: y, file: x });
      return { location, square: new Square(location, { rank: y, file: x }) };
    });
