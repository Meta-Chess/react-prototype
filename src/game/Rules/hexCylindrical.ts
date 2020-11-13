import { Adjacency, Square } from "../Board";
import { Rule } from "./Rules";
import { Direction, RankAndFileBounds } from "../types";
import { range, toLocation } from "utilities";
import { invisibilityToken } from "./constants";

export const hexCylindrical: Rule = {
  name: "Hex Cylinder",
  description:
    "The board has been wrapped onto a cylinder, and the edge files have been glued together. This allows pieces to move off the right side of the board onto the left side, and vice versa. (If you look closely, you'll notice that there's an invisible row of squares between the left edge and the right edge. This allows the gluing to happen without changing the local geometry.)",
  onBoardCreatedModify: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addSquares(generateEdgeStitchingSquares());
    board.addAdjacenciesByRule(cylindricalAdjacenciesRule(bounds));
    return { board };
  },
};

const generateEdgeStitchingSquares = (): { location: string; square: Square }[] =>
  range(5, 7, 2).map((rank) => {
    const location = toLocation({ rank, file: 0, prefix: "E" });
    return {
      location,
      square: new Square(location, { rank, file: 0 }, [invisibilityToken]),
    };
  });

const cylindricalAdjacenciesRule = ({ minFile, maxFile }: RankAndFileBounds) => (
  square: Square
): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return file === minFile
    ? [
        {
          direction: Direction.H7,
          location: toLocation({ rank: rank - 3, file: 0, prefix: "E" }),
        },
        {
          direction: Direction.H8,
          location: toLocation({ rank: rank - 1, file: 0, prefix: "E" }),
        },
        { direction: Direction.H9, location: toLocation({ rank, file: maxFile }) },
        {
          direction: Direction.H10,
          location: toLocation({ rank: rank + 1, file: 0, prefix: "E" }),
        },
        {
          direction: Direction.H11,
          location: toLocation({ rank: rank + 3, file: 0, prefix: "E" }),
        },
      ]
    : file === minFile + 1
    ? [
        {
          direction: Direction.H9,
          location: toLocation({ rank, file: 0, prefix: "E" }),
        },
      ]
    : file === maxFile
    ? [
        {
          direction: Direction.H1,
          location: toLocation({ rank: rank + 3, file: 0, prefix: "E" }),
        },
        {
          direction: Direction.H2,
          location: toLocation({ rank: rank + 1, file: 0, prefix: "E" }),
        },
        { direction: Direction.H3, location: toLocation({ rank, file: minFile }) },
        {
          direction: Direction.H4,
          location: toLocation({ rank: rank - 1, file: 0, prefix: "E" }),
        },
        {
          direction: Direction.H5,
          location: toLocation({ rank: rank - 3, file: 0, prefix: "E" }),
        },
      ]
    : file === maxFile - 1
    ? [
        {
          direction: Direction.H3,
          location: toLocation({ rank, file: 0, prefix: "E" }),
        },
      ]
    : file === 0 && square.getLocation().charAt(0) === "E"
    ? [
        { direction: Direction.H1, location: toLocation({ rank: rank + 3, file: 1 }) },
        { direction: Direction.H2, location: toLocation({ rank: rank + 1, file: 1 }) },
        { direction: Direction.H3, location: toLocation({ rank, file: 2 }) },
        { direction: Direction.H4, location: toLocation({ rank: rank - 1, file: 1 }) },
        { direction: Direction.H5, location: toLocation({ rank: rank - 3, file: 1 }) },
        {
          direction: Direction.H6,
          location: toLocation({ rank: rank - 2, file: 0, prefix: "E" }),
        },
        {
          direction: Direction.H7,
          location: toLocation({ rank: rank - 3, file: maxFile }),
        },
        {
          direction: Direction.H8,
          location: toLocation({ rank: rank - 1, file: maxFile }),
        },
        {
          direction: Direction.H9,
          location: toLocation({ rank, file: maxFile - 1 }),
        },
        {
          direction: Direction.H10,
          location: toLocation({ rank: rank + 1, file: maxFile }),
        },
        {
          direction: Direction.H11,
          location: toLocation({ rank: rank + 3, file: maxFile }),
        },
        {
          direction: Direction.H12,
          location: toLocation({ rank: rank + 2, file: 0, prefix: "E" }),
        },
      ]
    : [];
};
