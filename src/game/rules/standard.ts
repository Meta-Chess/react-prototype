import { range2, toLocation } from "utilities";
import { Adjacency, Piece, Square } from "../Board";
import { Direction, PieceName, PlayerName, RankAndFileBounds, Region } from "../types";
import { Rule } from "./CompactRules";
import { createPiece, determineGaitGenerator } from "./utilities";
import { moveIsAggressive } from "./defaults";

export const standard: Rule = {
  title: "Standard",
  description:
    "This rule takes care of all the details of your usual bog-standard board and piece set-up.",
  forSquareGenerationModify: ({ board }) => {
    board.addSquares(generateStandardSquares());
    board.defineRegion(Region.center, centerRegion);
    board.defineRegion(Region.promotion, promotionRegion);
    return { board };
  },
  onBoardCreate: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(standardAdjacencies(bounds));
    board.addPiecesByRule(standardPiecesRule);
    return { board };
  },
  getGaitGenerator: ({ gaitGenerator, name, owner }) => {
    return {
      gaitGenerator: determineGaitGenerator({
        gaitGenerators: gaitGenerator ? [gaitGenerator] : [],
        name,
        owner: owner || PlayerName.White,
      }),
      name,
      owner,
    };
  },
  moveIsAggressive,
};

const generateStandardSquares = (): { location: string; square: Square }[] =>
  range2(1, 8, 1, 8)
    .flat()
    .map(({ x, y }) => {
      const location = toLocation({ rank: y, file: x });
      return { location, square: new Square(location, { rank: y, file: x }) };
    });

const standardAdjacencies = (_bounds: RankAndFileBounds) => (
  square: Square
): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return [
    { direction: Direction.N, location: toLocation({ rank: rank + 1, file }) },
    { direction: Direction.NE, location: toLocation({ rank: rank + 1, file: file + 1 }) },
    { direction: Direction.E, location: toLocation({ rank, file: file + 1 }) },
    { direction: Direction.SE, location: toLocation({ rank: rank - 1, file: file + 1 }) },
    { direction: Direction.S, location: toLocation({ rank: rank - 1, file }) },
    { direction: Direction.SW, location: toLocation({ rank: rank - 1, file: file - 1 }) },
    { direction: Direction.W, location: toLocation({ rank, file: file - 1 }) },
    { direction: Direction.NW, location: toLocation({ rank: rank + 1, file: file - 1 }) },
  ];
};

const standardPiecesRule = (square: Square): Piece[] => {
  const { rank, file } = square.getCoordinates();
  const location = toLocation({ rank, file });
  const owner = rank > 4 ? PlayerName.Black : PlayerName.White;

  if (rank === 2) return [createPiece({ location, owner, name: PieceName.Pawn })];
  if (rank === 1) {
    if (file === 1 || file === 8)
      return [createPiece({ location, owner, name: PieceName.Rook })];
    if (file === 2 || file === 7)
      return [createPiece({ location, owner, name: PieceName.Knight })];
    if (file === 3 || file === 6)
      return [createPiece({ location, owner, name: PieceName.Bishop })];
    if (file === 4) return [createPiece({ location, owner, name: PieceName.Queen })];
    if (file === 5) return [createPiece({ location, owner, name: PieceName.King })];
  }

  if (rank === 7) return [createPiece({ location, owner, name: PieceName.Pawn })];
  if (rank === 8) {
    if (file === 1 || file === 8)
      return [createPiece({ location, owner, name: PieceName.Rook })];
    if (file === 2 || file === 7)
      return [createPiece({ location, owner, name: PieceName.Knight })];
    if (file === 3 || file === 6)
      return [createPiece({ location, owner, name: PieceName.Bishop })];
    if (file === 4) return [createPiece({ location, owner, name: PieceName.Queen })];
    if (file === 5) return [createPiece({ location, owner, name: PieceName.King })];
  }

  return [];
};

const centerRegion = [
  toLocation({ rank: 4, file: 4 }),
  toLocation({ rank: 4, file: 5 }),
  toLocation({ rank: 5, file: 4 }),
  toLocation({ rank: 5, file: 5 }),
];
const promotionRegion = [
  ...[
    toLocation({ rank: 8, file: 1 }),
    toLocation({ rank: 8, file: 2 }),
    toLocation({ rank: 8, file: 3 }),
    toLocation({ rank: 8, file: 4 }),
    toLocation({ rank: 8, file: 5 }),
    toLocation({ rank: 8, file: 6 }),
    toLocation({ rank: 8, file: 7 }),
    toLocation({ rank: 8, file: 8 }),
  ],
  ...[
    toLocation({ rank: 1, file: 1 }),
    toLocation({ rank: 1, file: 2 }),
    toLocation({ rank: 1, file: 3 }),
    toLocation({ rank: 1, file: 4 }),
    toLocation({ rank: 1, file: 5 }),
    toLocation({ rank: 1, file: 6 }),
    toLocation({ rank: 1, file: 7 }),
    toLocation({ rank: 1, file: 8 }),
  ],
];