import { PieceName } from "../types";
import { Rule } from "./Rules";

export const atomic: Rule = {
  name: "Atomic",
  description:
    "When a piece is captured, all pieces on adjacent squares are destroyed. Pawns shield their square from this effect. The capturing piece is also destroyed.",
  postCapture: ({ board, square }) => {
    const atomicImpactSquares = [square.location].concat(
      square.adjacencies.getAllAdjacencies()
    );

    board.killPiecesAt(square.location); //this square is double hit, is it slower to make an exception in the forEach(?)
    atomicImpactSquares.forEach((location) => {
      if (!board.getPiecesAt(location).some((piece) => piece.name === PieceName.Pawn)) {
        board.killPiecesAt(location);
      }
      //how could we make sure this doesnt happen in the clones in a neat way(?)
      board.animationHandler.addAnimation({
        duration: 1500,
        type: "square",
        locations: atomicImpactSquares,
      });
    });
    return { board, square };
  },
};
