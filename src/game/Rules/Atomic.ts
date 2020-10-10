import { PieceName } from "../types";
import { Rule } from "./Rules";

export const Atomic: Rule = {
  name: "Atomic",
  description:
    "When a piece is captured all pieces on adjacent squares are destroyed, pawns shield their square from this effect, the capturing piece is also destroyed.",
  postCapture: ({ board, square }) => {
    board.killPiecesAt(square.location);
    square.adjacencies.getAllAdjacencies().forEach((adjacency) => {
      if (!board.findPiecesAt(adjacency).some((piece) => piece.name === PieceName.Pawn)) {
        board.killPiecesAt(adjacency);
      }
    });
    return { board, square };
  },
};
