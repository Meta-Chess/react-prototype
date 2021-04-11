import { range, range2, toLocation } from "utilities";
import { Adjacency, Piece, Square } from "../Board";
import { Direction, PieceName, PlayerName, RankAndFileBounds } from "../types";
import { createPiece, determineGaitGenerator } from "./utilities";
import {
  Rule,
  ParameterRule,
  ForSquareGenerationModify,
  OnBoardCreate,
  GetGaitGenerator,
} from "./CompactRules";

export const standard: ParameterRule = (): Rule => {
  return {
    title: "Standard",
    description:
      "This rule takes care of all the details of your usual bog-standard board and piece set-up.",
    forSquareGenerationModify: ({
      board,
      numberOfPlayers,
    }): ForSquareGenerationModify => {
      board.addSquares(generateStandardSquares());
      board.defineRegion("center", centerRegion);
      board.defineRegion("promotion", promotionRegionWhite, PlayerName.White);
      board.defineRegion("promotion", promotionRegionBlack, PlayerName.Black);
      return { board, numberOfPlayers };
    },
    onBoardCreate: ({ board, numberOfPlayers }): OnBoardCreate => {
      const bounds = board.rankAndFileBounds();
      board.addAdjacenciesByRule(standardAdjacencies(bounds));
      board.addPiecesByRule(standardPiecesRule);
      return { board, numberOfPlayers };
    },
    getGaitGenerator: ({ gaitGenerator, name, owner }): GetGaitGenerator => {
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
  };
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
const promotionRegionWhite = range(1, 8).map((file) => toLocation({ rank: 8, file }));
const promotionRegionBlack = range(1, 8).map((file) => toLocation({ rank: 1, file }));
