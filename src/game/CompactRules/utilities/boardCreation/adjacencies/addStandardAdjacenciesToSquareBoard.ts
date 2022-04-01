import { Board } from "game/Board";
import { standardSquareAdjacencies } from "./standardSquareAdjacencies";

export function addStandardAdjacenciesToSquareBoard(board: Board): void {
  const bounds = board.rankAndFileBounds();
  board.addAdjacenciesByRule(standardSquareAdjacencies(bounds));
}
