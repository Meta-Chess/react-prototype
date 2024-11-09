import { range, toLocation } from "utilities";
import {
  ForSquareGenerationModify,
  GetGaitGenerator,
  OnBoardCreate,
  TrivialParameterRule,
  ProcessMoves,
  LossCondition,
} from "../CompactRules";
import { Adjacency, Coordinates, Piece, Square } from "game/Board";
import {
  Direction,
  PieceName,
  PlayerName,
  RankAndFileBounds,
  SquareShape,
  TokenName,
} from "game/types";
import { Move } from "game/Move";
import { createPiece, GET_GAIT_GENERATOR, PieceSet } from "../utilities";
import { Path } from "game/Pather";
import { cloneDeep } from "lodash";

export const nimbus: TrivialParameterRule = () => ({
  title: "Nimbus",
  description: "Core rules by xyz.",
  forSquareGenerationModify: ({ board, numberOfPlayers }): ForSquareGenerationModify => {
    board.addSquares(generateTriangularHexBoardSquares());
    // TODO: could think about defining regions, like "center" and "promotion"
    return { board, numberOfPlayers };
  },
  onBoardCreate: ({ board, numberOfPlayers }): OnBoardCreate => {
    const bounds = board.rankAndFileBounds();
    board.addAdjacenciesByRule(triangularHexBoardAdjacencies(bounds));
    board.addPiecesByRule(triangularHexBoardSetupRule);
    board.addToken(triangleShapeToken);
    return { board, numberOfPlayers };
  },
  getGaitGenerator: ({ gaitGenerator, name, owner }): GetGaitGenerator => {
    return GET_GAIT_GENERATOR({ gaitGenerator, name, owner, set: PieceSet.Nimbus });
  },
  processMoves: ({ moves, game, gameClones, params }): ProcessMoves => {
    const newTypeChangeMoves: Move[] = [];
    for (const move of moves) {
      const pilotPieceId = move.pieceId;
      const pilotPieceIsNimbus = game.board
        .getPiece(pilotPieceId)
        ?.hasTokenWithName(TokenName.Nimbus);
      const piecesAllowedToChangeType = game.board
        .piecesBelongingTo(game.currentPlayerIndex)
        .filter(
          (piece) => piece.id !== pilotPieceId || piece.hasTokenWithName(TokenName.Nimbus)
        );

      piecesAllowedToChangeType.forEach((changingPiece) => {
        return [
          PieceName.FirePiece,
          PieceName.WaterPiece,
          PieceName.EarthPiece,
          PieceName.LightningPiece,
        ].forEach((newPieceType) => {
          const changingPieceWontChangeType = newPieceType === changingPiece.name;
          if (changingPieceWontChangeType) return;

          let newMove = cloneDeep(move);
          if (changingPiece.hasTokenWithName(TokenName.Nimbus) && pilotPieceIsNimbus) {
            // TODO: could think about handling multiple piece deltas
            newMove.pieceDeltas[0].promoteTo = newPieceType;
            newTypeChangeMoves.push(newMove);
            return;
          }

          newMove = {
            ...newMove,
            pieceDeltas: [
              ...newMove.pieceDeltas,
              {
                pieceId: changingPiece.id,
                path: new Path(changingPiece.location, []),
                promoteTo: newPieceType,
              },
            ],
          };
          newTypeChangeMoves.push(newMove);
        });
      });
    }

    return { moves: [...moves, ...newTypeChangeMoves], game, gameClones, params };
  },
  lossCondition: ({ playerName, game, gameClones, interrupt, dead }): LossCondition => {
    if (dead || game.getCurrentPlayerName() !== playerName) {
      return { playerName, game, gameClones, interrupt, dead };
    }

    const friendlyPieces = game.board.piecesBelongingTo(playerName);
    const nimbusIsAlive =
      friendlyPieces.filter((piece) => piece.hasTokenWithName(TokenName.Nimbus))
        .length !== 0;

    if (!nimbusIsAlive) {
      return { playerName, game, gameClones, interrupt, dead: "has lost their Nimbus" };
    }

    const anyNonNimbusPiecesAreAlive =
      friendlyPieces.filter((piece) => !piece.hasTokenWithName(TokenName.Nimbus))
        .length !== 0;

    if (!anyNonNimbusPiecesAreAlive) {
      return { playerName, game, gameClones, interrupt, dead: "has lost all defenders" };
    }

    return { playerName, game, gameClones, interrupt, dead: false };
  },
});

const triangleShapeToken = {
  name: TokenName.Shape,
  expired: (): boolean => {
    return false;
  },
  data: { shape: SquareShape.Triangle },
};

const nimbusToken = {
  name: TokenName.Nimbus,
  expired: (): boolean => {
    return false;
  },
  data: undefined,
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

const triangularHexBoardSetupRule = (square: Square): Piece[] => {
  const { rank, file } = square.getCoordinates();
  const location = toLocation({ rank, file });

  // for board height 6
  const owner = rank > 3 ? PlayerName.White : PlayerName.Black;

  // black pieces
  if (rank === 1 && file === 6)
    return [
      createPiece({
        location,
        owner,
        name: PieceName.EarthPiece,
        set: PieceSet.Nimbus,
        tokens: [nimbusToken],
      }),
    ];
  if (rank === 1 && [5, 7].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.WaterPiece,
        set: PieceSet.Nimbus,
      }),
    ];
  if (rank === 1 && [4, 8].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.FirePiece,
        set: PieceSet.Nimbus,
      }),
    ];
  if (rank === 2 && file === 6)
    return [
      createPiece({
        location,
        owner,
        name: PieceName.FirePiece,
        set: PieceSet.Nimbus,
      }),
    ];
  if (rank === 2 && [5, 7].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.LightningPiece,
        set: PieceSet.Nimbus,
      }),
    ];

  // white pieces
  if (rank === 6 && file === 6)
    return [
      createPiece({
        location,
        owner,
        name: PieceName.EarthPiece,
        set: PieceSet.Nimbus,
        tokens: [nimbusToken],
      }),
    ];
  if (rank === 6 && [5, 7].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.WaterPiece,
        set: PieceSet.Nimbus,
      }),
    ];
  if (rank === 6 && [4, 8].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.FirePiece,
        set: PieceSet.Nimbus,
      }),
    ];
  if (rank === 5 && file === 6)
    return [
      createPiece({
        location,
        owner,
        name: PieceName.FirePiece,
        set: PieceSet.Nimbus,
      }),
    ];
  if (rank === 5 && [5, 7].includes(file))
    return [
      createPiece({
        location,
        owner,
        name: PieceName.LightningPiece,
        set: PieceSet.Nimbus,
      }),
    ];

  return [];
};
