import { PieceName, TokenName } from "../types";
import { Piece } from "../Board";
import { Rule } from "./Rules";
import { activeCastlingToken, passiveCastlingToken } from "./constants";
import { isPresent } from "utilities";
import { Pather, Scanner } from "../Pather";

export const castling: Rule = {
  name: "Castling",
  description:
    "Can your king move two squares in some direction? Is this your king's first move? Is there a rook in this direction from your king? Can that rook get to the square your king moves through? Is this that rook's first move? If so, your king and rook can do those moves at the same time!",
  postMove: ({ board, move, currentTurn }) => {
    const piecesMoved = move.pieceDeltas
      .map((delta) => board.pieces[delta.pId])
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
              activeDestination,
            }))
        );
      }
    );

    const filteredCastlePiecesAndLocations = castlePiecesAndLocations.filter(
      ({ passivePiece, passiveDestination }) => {
        const passivePieceMoveSet = new Pather(game, [], passivePiece, interrupt, {
          checkDepth: 0,
        }).findPaths();
        return passivePieceMoveSet
          .map((move) => move.location)
          .includes(passiveDestination.location);
      }
    );

    const newMoves = filteredCastlePiecesAndLocations.map(
      ({ passivePiece, passiveDestination, activeDestination }) => ({
        pieceId: activePiece.id,
        location: activeDestination.location,
        pieceDeltas: [
          { pId: passivePiece.id, destination: passiveDestination.location },
          { pId: activePiece.id, destination: activeDestination.location },
        ],
        player: activePiece.owner,
      })
    );

    return { game, piece: activePiece, interrupt, moves: [...moves, ...newMoves] };
  },
  onBoardCreatedModify: ({ board }) => {
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