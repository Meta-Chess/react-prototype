import { PieceName, Rule, TokenName } from "../types";
import { Piece } from "../Board";
import { activeCastlingToken, passiveCastlingToken } from "./constants";
import { isPresent } from "utilities";
import { Pather, Scanner } from "game/Pather";

export const Castling: Rule = {
  postMove: ({ move }) => {
    const piecesMoved = move.pieceDeltas.map((delta) => delta.piece);
    piecesMoved.forEach((piece: Piece) => {
      piece.removeTokensByNames([TokenName.ActiveCastling, TokenName.PassiveCastling]);
    });
  },
  generateSpecialMoves: (input) => {
    if (!input.piece.hasTokenWithName(TokenName.ActiveCastling)) return input;

    const { board, piece: activePiece, rules, moves } = input;

    const directions = activePiece
      .generateGaits()
      .map((g) => g.pattern[0])
      .filter(isPresent);
    const scanner = new Scanner(board, activePiece);

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
        const passiveDestinations = board.go({
          from: activePiece.location,
          path: [direction],
        });
        return passiveDestinations.flatMap((passiveDestination) =>
          board
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
        const passivePieceMoveSet = new Pather(board, passivePiece, rules).findPaths();
        return passivePieceMoveSet
          .map((move) => move.location)
          .includes(passiveDestination.location);
      }
    );

    const newMoves = filteredCastlePiecesAndLocations.map(
      ({ passivePiece, passiveDestination, activeDestination }) => ({
        location: activeDestination.location,
        pieceDeltas: [
          { piece: passivePiece, destination: passiveDestination.location },
          { piece: activePiece, destination: activeDestination.location },
        ],
      })
    );

    return { board, piece: activePiece, rules, moves: [...moves, ...newMoves] };
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
