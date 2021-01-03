import { PieceName, TokenName, AnimationType } from "../types";
import { Rule } from "./Rules";
import { Board } from "game";

export const atomic: Rule = {
  name: "Atomic",
  description:
    "When a piece is captured, all pieces on adjacent squares are destroyed. Pawns shield their square from this effect. The capturing piece is also destroyed.",
  postCapture: ({ board, square }) => {
    const atomicImpactSquares = square.adjacencies.getAllAdjacencies();
    const captureSquare = square.location;
    board.killPiecesAt(captureSquare);
    atomicImpactSquares.forEach((location) => {
      if (!board.getPiecesAt(location).some((piece) => piece.name === PieceName.Pawn)) {
        board.killPiecesAt(location);
      }
      addVisualTokenToSquare(location, board);
    });
    addVisualTokenToSquare(captureSquare, board);
    return { board, square };
  },
};

const addVisualTokenToSquare = (squareLocation: string, board: Board): void => {
  const creationTimeInMilliseconds = Date.now();
  const duration = 1000;
  board.squareAt(squareLocation)?.addToken({
    name: TokenName.AnimationToken,
    expired: () => Date.now() > creationTimeInMilliseconds + duration,
    data: {
      type: AnimationType.explosion,
      createdAt: creationTimeInMilliseconds,
      duration: duration,
      id: Math.random(),
    },
  });
};
