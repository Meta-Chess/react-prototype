import { Adjacency, Square } from "../Board";
import { Direction, RankAndFileBounds, TokenName } from "../types";
import { range, toLocation, wrapToCylinder } from "utilities";
import { Rule } from "./CompactRules";
import { invisibilityToken, polarToken } from "./constants";
import { rotate180 } from "./utilities";

export const polar: Rule = {
  title: "Polar",
  description:
    "The top and bottom of the board behave like the poles of a sphere. The top edge of the board is wrapped around the edge of an invisible octagonal 'square' that pieces can cross but can't stop on. The bottom edge of the board is similarly wrapped around its own octagonal square.",
  afterStepModify: ({ gait, remainingSteps, currentSquare }) => {
    return currentSquare.hasTokenWithName(TokenName.PolarToken)
      ? {
          gait: { ...gait, pattern: rotate180(gait.pattern) },
          remainingSteps: rotate180(remainingSteps),
          currentSquare,
        }
      : { gait, remainingSteps, currentSquare };
  },
  afterBoardCreation: ({ board }) => {
    const polarSetup = generatePolarSetup(board.rankAndFileBounds());
    board.addSquares(polarSetup.squares);
    board.addAdjacenciesByRule(polarSetup.adjacenciesRule);
    return { board };
  },
};

const generatePolarSetup = ({
  minRank,
  maxRank,
  minFile,
  maxFile,
}: RankAndFileBounds): {
  squares: { location: string; square: Square }[];
  adjacenciesRule: (square: Square) => Adjacency[];
} => {
  const numberOfFiles = maxFile - minFile + 1;
  return {
    squares: [
      ...range(minFile, numberOfFiles).map((x) => {
        const location = toLocation({ rank: maxRank + 1, file: x, prefix: "P" });
        return {
          location,
          square: new Square(
            location,
            { rank: 9, file: x },
            [],
            [polarToken, invisibilityToken]
          ),
        };
      }),
      ...range(minFile, numberOfFiles).map((x) => {
        const location = toLocation({ rank: minRank - 1, file: x, prefix: "P" });
        return {
          location,
          square: new Square(
            location,
            { rank: 0, file: x },
            [],
            [polarToken, invisibilityToken]
          ),
        };
      }),
    ],
    adjacenciesRule: (square): Adjacency[] => {
      const { rank, file } = square.getCoordinates();
      const wrap = wrapToCylinder(minRank, maxRank);
      return rank === minRank - 1
        ? [
            {
              direction: Direction.N,
              location: toLocation({ rank: minRank, file: wrap(file + 4) }),
            },
            {
              direction: Direction.NE,
              location: toLocation({ rank: minRank, file: wrap(file + 5) }),
            },
            {
              direction: Direction.NW,
              location: toLocation({ rank: minRank, file: wrap(file + 3) }),
            },
          ]
        : rank === maxRank + 1
        ? [
            {
              direction: Direction.S,
              location: toLocation({ rank: maxRank, file: wrap(file + 4) }),
            },
            {
              direction: Direction.SE,
              location: toLocation({ rank: maxRank, file: wrap(file + 5) }),
            },
            {
              direction: Direction.SW,
              location: toLocation({ rank: maxRank, file: wrap(file + 3) }),
            },
          ]
        : rank === minRank
        ? [
            {
              direction: Direction.S,
              location: toLocation({ rank: minRank - 1, file: wrap(file), prefix: "P" }),
            },
            {
              direction: Direction.SE,
              location: toLocation({
                rank: minRank - 1,
                file: wrap(file + 1),
                prefix: "P",
              }),
            },
            {
              direction: Direction.SW,
              location: toLocation({
                rank: minRank - 1,
                file: wrap(file - 1),
                prefix: "P",
              }),
            },
          ]
        : rank === maxRank
        ? [
            {
              direction: Direction.N,
              location: toLocation({ rank: maxRank + 1, file: wrap(file), prefix: "P" }),
            },
            {
              direction: Direction.NE,
              location: toLocation({
                rank: maxRank + 1,
                file: wrap(file + 1),
                prefix: "P",
              }),
            },
            {
              direction: Direction.NW,
              location: toLocation({
                rank: maxRank + 1,
                file: wrap(file - 1),
                prefix: "P",
              }),
            },
          ]
        : [];
    },
  };
};
