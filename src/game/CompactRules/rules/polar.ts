import { Adjacency, Square } from "game/Board";
import { Direction, RankAndFileBounds, TokenName } from "game/types";
import { range, toLocation, wrapToCylinder } from "utilities";
import {
  Rule,
  ParameterRule,
  AfterStepModify,
  AfterBoardCreation,
} from "../CompactRules";
import { invisibilityToken, polarToken } from "../constants";
import { rotate180 } from "../utilities";

const DIAGONAL_POLAR = false;

export const polar: ParameterRule = (): Rule => {
  return {
    title: "Polar",
    description: `The top and bottom of the board behave like the poles of a sphere. The top edge of the board is wrapped around the edge of an invisible octagonal 'square' that pieces can cross but can't stop on. The bottom edge of the board is similarly wrapped around its own octagonal square. Diagonal movement through the poles is ${
      DIAGONAL_POLAR ? "allowed" : "not allowed"
    }.`,
    afterStepModify: ({ gait, remainingSteps, currentSquare }): AfterStepModify => {
      return currentSquare.hasTokenWithName(TokenName.PolarToken)
        ? {
            gait: { ...gait, pattern: rotate180(gait.pattern) },
            remainingSteps: rotate180(remainingSteps),
            currentSquare,
          }
        : { gait, remainingSteps, currentSquare };
    },
    afterBoardCreation: ({ board }): AfterBoardCreation => {
      const polarSetup = generatePolarSetup(board.rankAndFileBounds());
      board.addSquares(polarSetup.squares);
      board.addAdjacenciesByRule(polarSetup.adjacenciesRule);
      return { board };
    },
  };
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
      const verticalAdjacencies: Adjacency[] =
        rank === minRank - 1
          ? [
              {
                direction: Direction.N,
                location: toLocation({ rank: minRank, file: wrap(file + 4) }),
              },
            ]
          : rank === maxRank + 1
          ? [
              {
                direction: Direction.S,
                location: toLocation({ rank: maxRank, file: wrap(file + 4) }),
              },
            ]
          : rank === minRank
          ? [
              {
                direction: Direction.S,
                location: toLocation({
                  rank: minRank - 1,
                  file: wrap(file),
                  prefix: "P",
                }),
              },
            ]
          : rank === maxRank
          ? [
              {
                direction: Direction.N,
                location: toLocation({
                  rank: maxRank + 1,
                  file: wrap(file),
                  prefix: "P",
                }),
              },
            ]
          : [];
      const diagonalAdjacencies: Adjacency[] = DIAGONAL_POLAR
        ? rank === minRank - 1
          ? [
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
          : []
        : [];
      return [...verticalAdjacencies, ...diagonalAdjacencies];
    },
  };
};