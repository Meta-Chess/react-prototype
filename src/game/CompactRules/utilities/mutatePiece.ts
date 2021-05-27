import { Piece, Board } from "game";
import { PieceName, Gait } from "game/types";

export const mutatePiece = (
  piece: Piece,
  newPieceName: PieceName | undefined,
  board: Board
): void => {
  if (newPieceName !== undefined) {
    piece.name = newPieceName;
    piece.generateGaits =
      board.interrupt.for.getGaitGenerator({
        name: newPieceName,
        owner: piece.owner,
      }).gaitGenerator || ((): Gait[] => []);
  }
};
