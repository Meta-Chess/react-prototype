import { Board, Move, PieceName } from "game";

export function isPieceNameCaptured(
  move: Move,
  board: Board,
  pieceName: PieceName
): boolean {
  return !!move.captures?.some((data) =>
    data.pieceIds.some((pieceId) => board?.getPiece(pieceId)?.name === pieceName)
  );
}
