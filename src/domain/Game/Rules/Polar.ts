import { Adjacency, Square } from "../Board";
import { Direction, RankAndFileBounds, Rule, TokenName } from "domain/Game/types";
import { range, wrapToCylinder } from "utilities";

export const Polar: Rule = {
  afterStepModify: ({ gait, remainingSteps, currentSquare }) => {
    return currentSquare.hasTokenWithName(TokenName.PolarToken)
      ? {
          gait: { ...gait, pattern: rotate180(gait.pattern) },
          remainingSteps: rotate180(remainingSteps),
          currentSquare,
        }
      : { gait, remainingSteps, currentSquare };
  },
  onBoardCreatedModify: ({ board }) => {
    const polarSetup = generatePolarSetup(board.rankAndFileBounds());
    board.addSquares(polarSetup.squares);
    board.addAdjacenciesByRule(polarSetup.adjacenciesRule);
    return { board };
  },
};

function rotate180(pattern: Direction[]): Direction[] {
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
    }
  });
}

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
        const location = `PR${maxRank + 1}F${x}`;
        return {
          location,
          square: new Square(location, { rank: 9, file: x }, [
            polarToken,
            invisibilityToken,
          ]),
        };
      }),
      ...range(minFile, numberOfFiles).map((x) => {
        const location = `PR${minRank - 1}F${x}`;
        return {
          location,
          square: new Square(location, { rank: 0, file: x }, [
            polarToken,
            invisibilityToken,
          ]),
        };
      }),
    ],
    adjacenciesRule: (square): Adjacency[] => {
      const { rank, file } = square.getCoordinates();
      const wrap = wrapToCylinder(minRank, maxRank);
      return rank === minRank - 1
        ? [
            { direction: Direction.N, location: `R${minRank}F${wrap(file + 4)}` },
            {
              direction: Direction.NE,
              location: `R${minRank}F${wrap(file + 5)}`,
            },
            {
              direction: Direction.NW,
              location: `R${minRank}F${wrap(file + 3)}`,
            },
          ]
        : rank === maxRank + 1
        ? [
            { direction: Direction.S, location: `R${maxRank}F${wrap(file + 4)}` },
            {
              direction: Direction.SE,
              location: `R${maxRank}F${wrap(file + 5)}`,
            },
            {
              direction: Direction.SW,
              location: `R${maxRank}F${wrap(file + 3)}`,
            },
          ]
        : rank === minRank
        ? [
            {
              direction: Direction.S,
              location: `PR${minRank - 1}F${wrap(file)}`,
            },
            {
              direction: Direction.SE,
              location: `PR${minRank - 1}F${wrap(file + 1)}`,
            },
            {
              direction: Direction.SW,
              location: `PR${minRank - 1}F${wrap(file - 1)}`,
            },
          ]
        : rank === maxRank
        ? [
            {
              direction: Direction.N,
              location: `PR${maxRank + 1}F${wrap(file)}`,
            },
            {
              direction: Direction.NE,
              location: `PR${maxRank + 1}F${wrap(file + 1)}`,
            },
            {
              direction: Direction.NW,
              location: `PR${maxRank + 1}F${wrap(file - 1)}`,
            },
          ]
        : [];
    },
  };
};

const polarToken = { name: TokenName.PolarToken, validTo: undefined, data: undefined };
const invisibilityToken = {
  name: TokenName.InvisibilityToken,
  validTo: undefined,
  data: undefined,
};
