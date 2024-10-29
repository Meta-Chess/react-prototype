import { range, toLocation } from "utilities";
import {
  ForSquareGenerationModify,
  GetGaitGenerator,
  OnBoardCreate,
  TrivialParameterRule,
} from "../CompactRules";
import { Adjacency, Piece, Square } from "game/Board";
import {
  Direction,
  PieceName,
  PlayerName,
  RankAndFileBounds,
  SquareShape,
  TokenName,
} from "game/types";
import {
  createPiece,
  GET_GAIT_GENERATOR,
  HEX_CLOCKWISE_DIRECTIONS,
  PieceSet,
} from "../utilities";

export const nimbus: TrivialParameterRule = () => ({
  title: "Nimbus",
  description: "Core rules by xyz.",
  forSquareGenerationModify: ({ board, numberOfPlayers }): ForSquareGenerationModify => {
    board.addSquares(generateHexSquares());
    board.defineRegion("center", centerRegion);
    board.defineRegion("promotion", promotionRegionWhite, PlayerName.White);
    board.defineRegion("promotion", promotionRegionBlack, PlayerName.Black);
    board.defineClockwiseDirections(HEX_CLOCKWISE_DIRECTIONS);
    return { board, numberOfPlayers };
  },
  onBoardCreate: ({ board, numberOfPlayers }): OnBoardCreate => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(hexAdjacencies(bounds));
    board.addPiecesByRule(hexPieceSetupRule);
    board.addToken(triangleShapeToken);
    return { board, numberOfPlayers };
  },
  getGaitGenerator: ({ gaitGenerator, name, owner }): GetGaitGenerator => {
    return GET_GAIT_GENERATOR({ gaitGenerator, name, owner, set: PieceSet.HexStandard });
  },
});

// upside down triangles??
const triangleShapeToken = {
  name: TokenName.Shape,
  expired: (): boolean => {
    return false;
  },
  data: { shape: SquareShape.Triangle },
};

const generateHexSquares = (): { location: string; square: Square }[] => {
  return range(1, 7).map((x) => {
    const rank = 1;
    const location = toLocation({ rank, file: x });
    return { location, square: new Square(location, { rank, file: x }) };
  });
};

const hexAdjacencies =
  (_bounds: RankAndFileBounds) =>
  (square: Square): Adjacency[] => {
    const { rank, file } = square.getCoordinates();
    return [
      {
        direction: Direction.H1,
        location: toLocation({ rank: rank + 3, file: file + 1 }),
      },
      {
        direction: Direction.H2,
        location: toLocation({ rank: rank + 1, file: file + 1 }),
      },
      { direction: Direction.H3, location: toLocation({ rank, file: file + 2 }) },
      {
        direction: Direction.H4,
        location: toLocation({ rank: rank - 1, file: file + 1 }),
      },
      {
        direction: Direction.H5,
        location: toLocation({ rank: rank - 3, file: file + 1 }),
      },
      { direction: Direction.H6, location: toLocation({ rank: rank - 2, file }) },
      {
        direction: Direction.H7,
        location: toLocation({ rank: rank - 3, file: file - 1 }),
      },
      {
        direction: Direction.H8,
        location: toLocation({ rank: rank - 1, file: file - 1 }),
      },
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
const promotionRegionBlack = [
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
];
const promotionRegionWhite = [
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
];
