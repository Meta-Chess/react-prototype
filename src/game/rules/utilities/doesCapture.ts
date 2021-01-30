import { Game, Move } from "game";
import { Piece } from "game/Board";

export const doesCapture = (game: Game, piece: Piece) => (move: Move): boolean => {
  return move.pieceDeltas.some((delta) =>
    game.board.getPiecesAt(delta.path.getEnd()).some((p) => p.owner !== piece.owner)
  );
};
