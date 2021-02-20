import { range, range2, toLocation } from "utilities";
import { Adjacency, Piece, Square } from "../Board";
import {
  Direction,
  PieceName,
  PlayerName,
  allPossiblePlayerNames,
  RankAndFileBounds,
  Region,
} from "../types";
import { Rule } from "./CompactRules";
import { createPiece, determineGaitGenerator } from "./utilities";
import { standardGaits } from "./constants";

export const longBoard: Rule = {
  title: "Long board",
  description:
    "The setup includes a long board and extra rows of pawns. It's designed to work well with vertical wrapping rules.",
  forSquareGenerationModify: ({ board, numberOfPlayers }) => {
    board.addSquares(generateStandardSquares(numberOfPlayers));
    board.defineRegion("center", centerRegion(numberOfPlayers));
    range(0, numberOfPlayers).forEach((n) =>
      board.defineRegion(
        "promotion",
        promotionRegion(numberOfPlayers, n),
        allPossiblePlayerNames[n]
      )
    );
    return { board, numberOfPlayers };
  },
  onBoardCreate: ({ board, numberOfPlayers }) => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(toroidalAdjacencies(bounds));
    board.addPiecesByRule(toroidalPiecesRule(numberOfPlayers));
    return { board, numberOfPlayers };
  },
  getGaitGenerator: ({ gaitGenerator, name, owner }) => {
    // Note: this method doesn't attempt to work out whether the piece should be a backwards pawn
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

const generateStandardSquares = (
  numberOfPlayers: number
): { location: string; square: Square }[] =>
  range2(1, 8, 1, 7 * numberOfPlayers - numberOfPlayers * (numberOfPlayers % 2))
    .flat()
    .map(({ x, y }) => {
      const location = toLocation({ rank: y, file: x });
      return { location, square: new Square(location, { rank: y, file: x }) };
    });

const toroidalAdjacencies = (_bounds: RankAndFileBounds) => (
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

const toroidalPiecesRule = (numberOfPlayers: number) => (square: Square): Piece[] => {
  const { rank, file } = square.getCoordinates();
  const location = toLocation({ rank, file });
  const ranks_per_player = 7 - (numberOfPlayers % 2);
  const owner: PlayerName = allPossiblePlayerNames[Math.floor(rank / ranks_per_player)];
  const relativeRank = rank % ranks_per_player;

  if (relativeRank === 3)
    return [
      new Piece(PieceName.Pawn, owner, () => standardGaits.BLACK_PAWN_GAITS, location),
    ];
  if (relativeRank === 4) {
    if (file === 1 || file === 8)
      return [createPiece({ location, owner, name: PieceName.Rook })];
    if (file === 2 || file === 7)
      return [createPiece({ location, owner, name: PieceName.Knight })];
    if (file === 3 || file === 6)
      return [createPiece({ location, owner, name: PieceName.Bishop })];
    if (file === 4) return [createPiece({ location, owner, name: PieceName.Queen })];
    if (file === 5) return [createPiece({ location, owner, name: PieceName.King })];
  }
  if (relativeRank === 5)
    return [
      new Piece(PieceName.Pawn, owner, () => standardGaits.WHITE_PAWN_GAITS, location),
    ];

  return [];
};

function centerRegion(numberOfPlayers: number): string[] {
  const ranks_per_player = 7 - (numberOfPlayers % 2);

  return range(0, numberOfPlayers).flatMap((i) => [
    toLocation({ rank: 1 + ranks_per_player * i, file: 4 }),
    toLocation({ rank: 1 + ranks_per_player * i, file: 5 }),
    toLocation({ rank: 7 + ranks_per_player * i, file: 4 }),
    toLocation({ rank: 7 + ranks_per_player * i, file: 5 }),
  ]);
}
function promotionRegion(numberOfPlayers: number, playerIndex: number): string[] {
  const ranks_per_player = 7 - (numberOfPlayers % 2);

  return range(0, numberOfPlayers).flatMap((i) =>
    i === playerIndex
      ? []
      : range(1, 8).map((file) => toLocation({ rank: 4 + ranks_per_player * i, file }))
  );
}
