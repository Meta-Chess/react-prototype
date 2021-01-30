import { range, toLocation } from "utilities";
import { Rule } from "./CompactRules";
import { Adjacency, Piece, Square } from "../Board";
import {
  Direction,
  PieceName,
  PlayerName,
  RankAndFileBounds,
  SquareShape,
  TokenName,
} from "../types";
import { createPiece, determineGaitGenerator, PieceSet } from "./utilities";
import { Region } from "../types";
import { moveIsAggressive } from "./defaults";

export const hex: Rule = {
  title: "Hexagon",
  description:
    "Every place on the board has a hexagonal geometry rather than a square geometry. Note that diagonal steps are a bit longer than usual. Click on a piece to find out how it moves!",
  forSquareGenerationModify: ({ board, numberOfPlayers }) => {
    board.addSquares(generateHexSquares());
    board.defineRegion(Region.center, centerRegion);
    board.defineRegion(Region.promotion, promotionRegion);
    return { board, numberOfPlayers };
  },
  onBoardCreate: ({ board }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(hexAdjacencies(bounds));
    board.addPiecesByRule(hexPieceSetupRule);
    board.addToken(hexShapeToken);
    return { board };
  },
  getGaitGenerator: ({ gaitGenerator, name, owner }) => {
    return {
      gaitGenerator: determineGaitGenerator({
        gaitGenerators: gaitGenerator ? [gaitGenerator] : [],
        name,
        set: PieceSet.HexStandard,
        owner: owner || PlayerName.White,
      }),
      name,
      owner,
    };
  },
  moveIsAggressive,
};

const hexShapeToken = {
  name: TokenName.Shape,
  expired: (): boolean => {
    return false;
  },
  data: { shape: SquareShape.Hex },
};

const generateHexSquares = (): { location: string; square: Square }[] =>
  range(1, 11)
    .map((x) =>
      range(1 + Math.abs(x - 6), 11 - Math.abs(x - 6), 2).map((y) => ({ x, y }))
    )
    .flat()
    .map(({ x, y }) => {
      const location = toLocation({ rank: y, file: x });
      return { location, square: new Square(location, { rank: y, file: x }) };
    });

const hexAdjacencies = (_bounds: RankAndFileBounds) => (square: Square): Adjacency[] => {
  const { rank, file } = square.getCoordinates();
  return [
    { direction: Direction.H1, location: toLocation({ rank: rank + 3, file: file + 1 }) },
    { direction: Direction.H2, location: toLocation({ rank: rank + 1, file: file + 1 }) },
    { direction: Direction.H3, location: toLocation({ rank, file: file + 2 }) },
    { direction: Direction.H4, location: toLocation({ rank: rank - 1, file: file + 1 }) },
    { direction: Direction.H5, location: toLocation({ rank: rank - 3, file: file + 1 }) },
    { direction: Direction.H6, location: toLocation({ rank: rank - 2, file }) },
    { direction: Direction.H7, location: toLocation({ rank: rank - 3, file: file - 1 }) },
    { direction: Direction.H8, location: toLocation({ rank: rank - 1, file: file - 1 }) },
    { direction: Direction.H9, location: toLocation({ rank, file: file - 2 }) },
    {
      direction: Direction.H10,
      location: toLocation({ rank: rank + 1, file: file - 1 }),
    },
    {
      direction: Direction.H11,
      location: toLocation({ rank: rank + 3, file: file - 1 }),
    },
    { direction: Direction.H12, location: toLocation({ rank: rank + 2, file }) },
  ];
};

const hexPieceSetupRule = (square: Square): Piece[] => {
  const { rank, file } = square.getCoordinates();
  const location = toLocation({ rank, file });
  const owner = rank > 10 ? PlayerName.Black : PlayerName.White;
  const set = PieceSet.HexStandard;

  if ([1, 3, 5].includes(rank) && file === 6)
    return [createPiece({ location, owner, name: PieceName.Bishop, set })];
  if (rank === 2 && file === 5)
    return [createPiece({ location, owner, name: PieceName.Queen, set })];
  if (rank === 2 && file === 7)
    return [createPiece({ location, owner, name: PieceName.King, set })];
  if (rank === 3 && [4, 8].includes(file))
    return [createPiece({ location, owner, name: PieceName.Knight, set })];
  if (rank === 4 && [3, 9].includes(file))
    return [createPiece({ location, owner, name: PieceName.Rook, set })];
  if (rank === 9 - Math.abs(file - 6))
    return [createPiece({ location, owner, name: PieceName.Pawn, set })];

  if ([21, 19, 17].includes(rank) && file === 6)
    return [createPiece({ location, owner, name: PieceName.Bishop, set })];
  if (rank === 20 && file === 5)
    return [createPiece({ location, owner, name: PieceName.Queen, set })];
  if (rank === 20 && file === 7)
    return [createPiece({ location, owner, name: PieceName.King, set })];
  if (rank === 19 && [4, 8].includes(file))
    return [createPiece({ location, owner, name: PieceName.Knight, set })];
  if (rank === 18 && [3, 9].includes(file))
    return [createPiece({ location, owner, name: PieceName.Rook, set })];
  if (rank === 13 + Math.abs(file - 6))
    return [createPiece({ location, owner, name: PieceName.Pawn, set })];

  return [];
};

const centerRegion = [toLocation({ rank: 11, file: 6 })];
const promotionRegion = [
  ...[
    toLocation({ rank: 6, file: 1 }),
    toLocation({ rank: 5, file: 2 }),
    toLocation({ rank: 4, file: 3 }),
    toLocation({ rank: 3, file: 4 }),
    toLocation({ rank: 2, file: 5 }),
    toLocation({ rank: 1, file: 6 }),
    toLocation({ rank: 2, file: 7 }),
    toLocation({ rank: 3, file: 8 }),
    toLocation({ rank: 4, file: 9 }),
    toLocation({ rank: 5, file: 10 }),
    toLocation({ rank: 6, file: 11 }),
  ],
  ...[
    toLocation({ rank: 16, file: 1 }),
    toLocation({ rank: 17, file: 2 }),
    toLocation({ rank: 18, file: 3 }),
    toLocation({ rank: 19, file: 4 }),
    toLocation({ rank: 20, file: 5 }),
    toLocation({ rank: 21, file: 6 }),
    toLocation({ rank: 20, file: 7 }),
    toLocation({ rank: 19, file: 8 }),
    toLocation({ rank: 18, file: 9 }),
    toLocation({ rank: 17, file: 10 }),
    toLocation({ rank: 16, file: 11 }),
  ],
];
