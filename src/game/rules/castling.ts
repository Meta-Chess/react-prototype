import { PieceName, TokenName } from "../types";
import { Piece, Rule } from "game";
import { activeCastlingToken, passiveCastlingToken } from "./constants";
import { isPresent, hasPresentKey } from "ts-is-present";
import { Pather, Scanner } from "../Pather";
import { Path } from "game/Pather/Path";

export const castling: Rule = {
  title: "Castling",
  description:
    "Can your king move two squares in some direction? Is this your king's first move? Is there a rook in this direction from your king? Can that rook get to the square your king moves through? Is this that rook's first move? If so, your king and rook can do those moves at the same time!",
  postMove: ({ board, move, currentTurn }) => {
    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pieceId])
      .filter((piece) => piece !== undefined);
    piecesMoved.forEach((piece: Piece) => {
      piece.removeTokensByNames([TokenName.ActiveCastling, TokenName.PassiveCastling]);
    });
    return { board, move, currentTurn };
  },
  generateSpecialMoves: (input) => {
    if (!input.piece.hasTokenWithName(TokenName.ActiveCastling)) return input;

    const { game, piece: activePiece, interrupt, moves } = input;

    const directions = activePiece
      .generateGaits()
      .map((g) => g.pattern[0])
      .filter(isPresent);
    const scanner = new Scanner(game.board, activePiece);

    const castlePiecesAndDirections = directions.flatMap((direction) =>
      scanner
        .scan({
          pattern: [direction],
          pieceMatcher: (p) => p.hasTokenWithName(TokenName.PassiveCastling),
        })
        .map((piece) => ({ piece, direction }))
    );

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
        }).findPaths();
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
          interceptionCondition: (): boolean => true,
          interceptableAtStart: true,
        },
      })
    );

    return { game, piece: activePiece, interrupt, moves: [...moves, ...newMoves] };
  },
  afterBoardCreation: ({ board }) => {
    board.addPieceTokensByRule((piece: Piece) =>
      piece.name === PieceName.King
        ? [activeCastlingToken]
        : piece.name === PieceName.Rook
        ? [passiveCastlingToken]
        : []
    );
    return { board };
  },
};
