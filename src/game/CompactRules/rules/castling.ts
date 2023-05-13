import { PieceName, TokenName } from "game/types";
import { activeCastlingToken, passiveCastlingToken } from "../constants";
import { hasPresentKey, isPresent } from "ts-is-present";
import { Pather } from "game/Pather";
import { Path } from "game/Pather/Path";
import {
  AfterBoardCreation,
  GenerateSpecialPacifistMoves,
  PostMove,
} from "../CompactRules";
import { Piece } from "game/Board";
import { TrivialParameterRule } from "game";

export const castling: TrivialParameterRule = () => ({
  title: "Castling",
  description:
    "Can your king move two squares in some direction? Is this your king's first move? Is there a rook in this direction from your king? Can that rook get to the square your king moves through? Is this that rook's first move? If so, your king and rook can do those moves at the same time!",
  postMove: ({ game, interrupt, board, move, currentTurn }): PostMove => {
    if (!move) return { game, interrupt, board, move, currentTurn };
    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pieceId])
      .filter((piece) => piece !== undefined);
    piecesMoved.forEach((piece: Piece) => {
      piece.removeTokensByNames([TokenName.ActiveCastling, TokenName.PassiveCastling]);
    });
    return { game, interrupt, board, move, currentTurn };
  },
  generateSpecialPacifistMoves: (input): GenerateSpecialPacifistMoves => {
    if (!input.piece.hasTokenWithName(TokenName.ActiveCastling)) return input;

    const { game, piece: activePiece, interrupt, moves } = input;

    const directions = activePiece
      .generateGaits()
      .map((g) => g.pattern[0])
      .filter(isPresent);
    const pather = new Pather(game, [], activePiece, interrupt);

    const castlePiecesAndDirections = directions.flatMap((direction) => {
      const paths = pather.path({
        gait: { pattern: [direction], repeats: true, phaser: true },
      });
      return game.board
        .getPiecesAt(paths[paths.length - 1]?.getEnd())
        .filter((p) => p.hasTokenWithName(TokenName.PassiveCastling))
        .map((piece) => ({ piece, direction }));
    });

    const castlePiecesAndLocations = castlePiecesAndDirections.flatMap(
      ({ piece: passivePiece, direction }) => {
        const passiveDestinations = game.board.go({
          from: activePiece.location,
          path: [direction],
        });
        return passiveDestinations.flatMap((passiveDestination) =>
          game.board
            .go({ from: passiveDestination.location, path: [direction] })
            .map((activeDestination) => ({
              passivePiece,
              passiveDestination,
              // the active piece moves from its start to the destination through the passive piece's destination
              activePath: new Path(activePiece.location, [
                passiveDestination.location,
                activeDestination.location,
              ]),
            }))
        );
      }
    );

    const castlePiecesAndPaths = castlePiecesAndLocations
      .map(({ passivePiece, passiveDestination, activePath }) => {
        const passivePieceMoveSet = new Pather(game, [], passivePiece, interrupt, {
          checkDepth: 0,
          noForkSearch: false,
          chainReactionSearch: false,
        }).findPaths({});
        const passivePath = passivePieceMoveSet.find(
          (move) => move.location === passiveDestination.location
        )?.pieceDeltas[0].path;
        return { passivePiece, passivePath, activePath };
      })
      .filter(hasPresentKey("passivePath"));

    const newMoves = castlePiecesAndPaths.map(
      ({ passivePiece, passivePath, activePath }) => ({
        pieceId: activePiece.id,
        location: activePath.getEnd(),
        pieceDeltas: [
          { pieceId: passivePiece.id, path: passivePath },
          { pieceId: activePiece.id, path: activePath },
        ],
        playerName: activePiece.owner,
        data: {
          interceptable: true,
          interceptionCondition: (piece: Piece): boolean => {
            const originalOwner = activePiece.owner;
            return piece.owner !== originalOwner;
          },
          interceptableAtStart: true,
        },
      })
    );

    return { game, piece: activePiece, interrupt, moves: [...moves, ...newMoves] };
  },
  afterBoardCreation: ({ board }): AfterBoardCreation => {
    board.addPieceTokensByRule((piece: Piece) =>
      piece.name === PieceName.King
        ? [activeCastlingToken]
        : piece.name === PieceName.Rook
        ? [passiveCastlingToken]
        : []
    );
    return { board };
  },
});
