import { Board, Square } from "game/Board";

export function allAdjacencies(board: Board, originSquare: Square | undefined): string[] {
  if (originSquare !== undefined) {
    return originSquare.adjacencies.getAllAdjacencies();
  }
  return [];
}
