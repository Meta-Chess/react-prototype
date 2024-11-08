import { range, toLocation } from "utilities";
import {
  ForSquareGenerationModify,
  GetGaitGenerator,
  OnBoardCreate,
  TrivialParameterRule,
  OnGaitsGeneratedModify,
  PostMove,
  ProcessMoves,
  OnPieceDisplaced,
} from "../CompactRules";
import { Adjacency, Coordinates, Piece, Square } from "game/Board";
import {
  Direction,
  Gait,
  GaitParams,
  PieceName,
  PlayerName,
  RankAndFileBounds,
  SquareShape,
  TokenName,
  NimbusPieceType,
} from "game/types";
import {
  createPiece,
  GET_GAIT_GENERATOR,
  HEX_CLOCKWISE_DIRECTIONS,
  PieceSet,
} from "../utilities";
import { Path } from "game/Pather";
import { PieceDelta } from "game/Move";

export const nimbus: TrivialParameterRule = () => ({
  title: "Nimbus",
  description: "Core rules by xyz.",
  forSquareGenerationModify: ({ board, numberOfPlayers }): ForSquareGenerationModify => {
    board.addSquares(generateTriangularHexBoardSquares());

    // board.defineRegion("center", centerRegion);
    // board.defineRegion("promotion", promotionRegionWhite, PlayerName.White);
    // board.defineRegion("promotion", promotionRegionBlack, PlayerName.Black);

    // board.defineClockwiseDirections(HEX_CLOCKWISE_DIRECTIONS);

    return { board, numberOfPlayers };
  },
  onBoardCreate: ({ board, numberOfPlayers }): OnBoardCreate => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(triangularHexBoardAdjacencies(bounds));
    board.addPiecesByRule(triangularHexBoardSetupRule);
    board.addToken(triangleShapeToken);
    return { board, numberOfPlayers };
  },
  processMoves: ({ moves, game, gameClones, params }): ProcessMoves => {
    // const pilotPieceIds = moves.map((move) => move.pieceId);
    // const piecesWhichCanTypeChange = game.board
    //   .piecesBelongingTo(game.currentPlayerIndex)
    //   .filter(
    //     (piece) => piece.name === PieceName.King || !pilotPieceIds.includes(piece.id)
    //   );
    // const pieceDeltasChangingPieces = piecesWhichCanTypeChange.flatMap((piece) =>
    //   [PieceName.King, PieceName.Rook, PieceName.Bishop].map((type) => {
    //     return {
    //       pieceId: piece.id,
    //       path: new Path(piece.location, []),
    //       promoteTo: type,
    //     };
    //   })
    // );

    // // TODO: fix the pathing when the king would like to change

    // const movesWithPieceChange = moves.flatMap((move) =>
    //   pieceDeltasChangingPieces.flatMap((newDelta) => {
    //     return { ...move, pieceDeltas: [...move.pieceDeltas, newDelta] };
    //   })
    // );

    // [
    //   NimbusPieceType.fire,
    //   NimbusPieceType.water,
    //   NimbusPieceType.earth,
    //   NimbusPieceType.lightning,
    // ]

    // promoteTo: every other piece...
    // and there is a promotion rule which catches it...
    // const movesWithPieceChange = moves.flatMap((move) =>
    //   [PieceName.King, PieceName.Rook, PieceName.Bishop].flatMap((type) => {
    //     return {
    //       ...move,
    //       pieceDeltas: move.pieceDeltas.map((pieceDelta) => {
    //         return { ...pieceDelta, promoteTo: type };
    //       }),
    //     };
    //   })
    // );
    return { moves: moves, game, gameClones, params };
  },
  // onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
  //   if (pieceDelta.promoteTo !== undefined) {
  //     const piece = board.getPiece(pieceDelta.pieceId);
  //     if (piece) {
  //       piece.name = pieceDelta.promoteTo;
  //       piece.generateGaits =
  //         board.interrupt.for.getGaitGenerator({
  //           name: pieceDelta.promoteTo,
  //         }).gaitGenerator || ((): Gait[] => []);
  //     }
  //   }
  //   return { board, pieceDelta };
  // },
  // postMove: ({ game, interrupt, board, move, currentTurn }): PostMove => {
  //   if (!move) return { game, interrupt, board, move, currentTurn };

  //   const changablePieces = game.board
  //     .piecesBelongingTo(game.currentPlayerIndex)
  //     .filter((piece) => piece.name === PieceName.King || piece.id !== move.pieceId);
  //   if (move.pieceId)
  //     const piecesMoved = move.pieceDeltas
  //       .map((delta) => board.pieces[delta.pieceId])
  //       .filter((piece) => piece !== undefined);
  //   piecesMoved.forEach((piece: Piece) => {
  //     piece.removeTokensByNames([TokenName.ActiveCastling, TokenName.PassiveCastling]);
  //   });
  //   return { game, interrupt, board, move, currentTurn };
  // },
});

const triangleShapeToken = {
  name: TokenName.Shape,
  expired: (): boolean => {
    return false;
  },
  data: { shape: SquareShape.Triangle },
};

const fireToken = {
  name: TokenName.NimbusPiece,
  expired: (): boolean => {
    return false;
  },
  data: { nimbusPieceType: NimbusPieceType.fire },
};
const waterToken = {
  name: TokenName.NimbusPiece,
  expired: (): boolean => {
    return false;
  },
  data: { nimbusPieceType: NimbusPieceType.water },
};
const earthToken = {
  name: TokenName.NimbusPiece,
  expired: (): boolean => {
    return false;
  },
  data: { nimbusPieceType: NimbusPieceType.earth },
};
const lightningToken = {
  name: TokenName.NimbusPiece,
  expired: (): boolean => {
    return false;
  },
  data: { nimbusPieceType: NimbusPieceType.lightning },
};

export const thisTriangleIsUpright = (
  thisTriangle: Coordinates,
  knownUpwardsTriangle: Coordinates
): boolean => {
  return (
    (knownUpwardsTriangle.rank + knownUpwardsTriangle.file) % 2 ===
    (thisTriangle.rank + thisTriangle.file) % 2
  );
};

const generateTriangularHexBoardSquares = (): { location: string; square: Square }[] => {
  return [
    ...range(3, 7).map((x) => {
      const rank = 1;
      const location = toLocation({ rank, file: x });
      return { location, square: new Square(location, { rank, file: x }) };
    }),
    ...range(2, 9).map((x) => {
      const rank = 2;
      const location = toLocation({ rank, file: x });
      return { location, square: new Square(location, { rank, file: x }) };
    }),
    ...range(1, 11).map((x) => {
      const rank = 3;
      const location = toLocation({ rank, file: x });
      return { location, square: new Square(location, { rank, file: x }) };
    }),
    ...range(1, 11).map((x) => {
      const rank = 4;
      const location = toLocation({ rank, file: x });
      return { location, square: new Square(location, { rank, file: x }) };
    }),
    ...range(2, 9).map((x) => {
      const rank = 5;
      const location = toLocation({ rank, file: x });
      return { location, square: new Square(location, { rank, file: x }) };
    }),
    ...range(3, 7).map((x) => {
      const rank = 6;
      const location = toLocation({ rank, file: x });
      return { location, square: new Square(location, { rank, file: x }) };
    }),
  ];
};

const triangularHexBoardAdjacencies =
  (bounds: RankAndFileBounds) =>
  (square: Square): Adjacency[] => {
    const { rank, file } = square.getCoordinates();

    const uprightTriangle = thisTriangleIsUpright(square.getCoordinates(), {
      rank: bounds.minRank,
      file: bounds.minFile,
    });

    const hexagonals = [
      {
        direction: Direction.TH1,
        location: toLocation({ rank: rank - 1, file: file + 1 }),
      },
      {
        direction: Direction.TH2,
        location: toLocation({ rank, file: file + 2 }),
      },
      {
        direction: Direction.TH3,
        location: toLocation({ rank: rank + 1, file: file + 1 }),
      },
      {
        direction: Direction.TH4,
        location: toLocation({ rank: rank + 1, file: file - 1 }),
      },
      {
        direction: Direction.TH5,
        location: toLocation({ rank, file: file - 2 }),
      },
      {
        direction: Direction.TH6,
        location: toLocation({ rank: rank - 1, file: file - 1 }),
      },
    ];
    if (uprightTriangle) {
      const corners = [
        {
          direction: Direction.TC1,
          location: toLocation({ rank: rank - 1, file }),
        },
        {
          direction: Direction.TC2,
          location: toLocation({ rank: rank + 1, file: file + 2 }),
        },
        {
          direction: Direction.TC3,
          location: toLocation({ rank: rank + 1, file: file - 2 }),
        },
      ];
      const edges = [
        {
          direction: Direction.TE1,
          location: toLocation({ rank, file: file + 1 }),
        },
        {
          direction: Direction.TE2,
          location: toLocation({ rank: rank + 1, file }),
        },
        {
          direction: Direction.TE3,
          location: toLocation({ rank, file: file - 1 }),
        },
      ];
      return [...corners, ...edges, ...hexagonals];
    } else {
      const corners = [
        {
          direction: Direction.TC1,
          location: toLocation({ rank: rank - 1, file: file + 2 }),
        },
        {
          direction: Direction.TC2,
          location: toLocation({ rank: rank + 1, file }),
        },
        {
          direction: Direction.TC3,
          location: toLocation({ rank: rank - 1, file: file - 2 }),
        },
      ];
      const edges = [
        {
          direction: Direction.TE1,
          location: toLocation({ rank: rank - 1, file }),
        },
        {
          direction: Direction.TE2,
          location: toLocation({ rank, file: file + 1 }),
        },
        {
          direction: Direction.TE3,
          location: toLocation({ rank, file: file - 1 }),
        },
      ];
      return [...corners, ...edges, ...hexagonals];
    }
  };

// const noGaitGenerators = [
//   (): Gait[] => {
//     return [];
//   },
// ];

// enum NimbusPieceType {
//   fire = PieceName.FirePiece,
//   water = PieceName.WaterPiece,
//   earth = PieceName.EarthPiece,
//   lightning = PieceName.LightningPiece,
// }

const triangularHexBoardSetupRule = (square: Square): Piece[] => {
  const { rank, file } = square.getCoordinates();
  const location = toLocation({ rank, file });

  // for board height 6
  const owner = rank > 3 ? PlayerName.White : PlayerName.Black;

  if (rank === 1 && file === 6)
    return [
      createPiece({
        location,
        owner,
        name: PieceName.EarthPiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.earth],
      }),
    ];
  if (rank === 1 && [5, 7].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.WaterPiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.water],
      }),
    ];
  if (rank === 1 && [4, 8].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.FirePiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.fire],
      }),
    ];
  if (rank === 2 && file === 6)
    return [
      createPiece({
        location,
        owner,
        name: PieceName.FirePiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.fire],
      }),
    ];
  if (rank === 2 && [5, 7].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.LightningPiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.lightning],
      }),
    ];

  if (rank === 6 && file === 6)
    return [
      createPiece({
        location,
        owner,
        name: PieceName.EarthPiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.earth],
      }),
    ];
  if (rank === 6 && [5, 7].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.WaterPiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.water],
      }),
    ];
  if (rank === 6 && [4, 8].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.FirePiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.fire],
      }),
    ];
  if (rank === 5 && file === 6)
    return [
      createPiece({
        location,
        owner,
        name: PieceName.FirePiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.fire],
      }),
    ];
  if (rank === 5 && [5, 7].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.LightningPiece,
        gaitGenerators: [nimbusPieceGaitsGenerators.lightning],
      }),
    ];

  return [];
};

// const centerRegion = [toLocation({ rank: 11, file: 6 })];

const TriangularHexagonalDirections = [
  Direction.TH1,
  Direction.TH2,
  Direction.TH3,
  Direction.TH4,
  Direction.TH5,
  Direction.TH6,
];
const TriangularEdgeDirections = [Direction.TE1, Direction.TE2, Direction.TE3];

const turnDirections = (A: Direction): Direction[] => {
  switch (A) {
    case Direction.TC1:
      return [Direction.TE2, Direction.TE3];
    case Direction.TC2:
      return [Direction.TE1, Direction.TE3];
    case Direction.TC3:
      return [Direction.TE1, Direction.TE2];
    case Direction.TE1:
      return [Direction.TC2, Direction.TC3];
    case Direction.TE2:
      return [Direction.TC1, Direction.TC3];
    case Direction.TE3:
      return [Direction.TC1, Direction.TC2];
    case Direction.TH1:
      return [Direction.TH6, Direction.TH1];
    case Direction.TH2:
      return [Direction.TH1, Direction.TH3];
    case Direction.TH3:
      return [Direction.TH2, Direction.TH4];
    case Direction.TH4:
      return [Direction.TH3, Direction.TH5];
    case Direction.TH5:
      return [Direction.TH4, Direction.TH6];
    case Direction.TH6:
      return [Direction.TH5, Direction.TH1];
    default:
      throw new Error("Invalid direction");
  }
};

const nimbusPieceGaitsGenerators: { [type: string]: () => Gait[] } = {
  fire: () =>
    TriangularEdgeDirections.map((A) =>
      TriangularEdgeDirections.map((B) => {
        return {
          pattern: [A, B, A, B],
          interruptable: true,
        };
      })
    )
      .flat()
      .flat(),
  water: () => [
    {
      pattern: [Direction.TC1, Direction.TE1],
      repeats: true,
      interruptable: true,
    },
    {
      pattern: [Direction.TC2, Direction.TE2],
      repeats: true,
      interruptable: true,
    },
    {
      pattern: [Direction.TC3, Direction.TE3],
      repeats: true,
      interruptable: true,
    },
  ],
  earth: () => [
    ...[
      [Direction.TE1, Direction.TC1],
      [Direction.TE2, Direction.TC2],
      [Direction.TE3, Direction.TC3],
    ]
      .map((ds) => {
        return [
          { pattern: ds, nonBlocking: true },
          ...turnDirections(ds[1]).map((d3) => [
            { pattern: [...ds, d3], nonBlocking: true },
          ]),
        ];
      })
      .flat()
      .flat(),
  ],
  lightning: () => [
    ...TriangularHexagonalDirections.map((A) => ({
      pattern: [A, A],
      interruptable: true,
    })),
    ...TriangularHexagonalDirections.flatMap((A) =>
      turnDirections(A).map((B) => [{ pattern: [A, B] }])
    ).flat(),
  ],
};
