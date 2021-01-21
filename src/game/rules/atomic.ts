import { PieceName, TokenName, AnimationType } from "../types";
import { Rule } from "./CompactRules";
import { Board } from "game";
import { standardKingStep } from "./utilities";

export const atomic: Rule = {
  title: "Atomic",
  description:
    "When a piece is captured, all pieces on adjacent squares are destroyed. Pawns shield their square from this effect. The capturing piece is also destroyed.",

  subscribeToEvents: ({ events }) => {
    events.subscribe({
      name: "capture",
      consequence: ({ board, square }) => {
        const atomicImpactSquares = standardKingStep(board, square);
        const captureSquare = square.location;
        board.killPiecesAt(captureSquare);
        atomicImpactSquares.forEach((location) => {
          if (!board.getPiecesAt(location).some((piece) => piece.name === PieceName.Pawn))
            board.killPiecesAt(location);
          addVisualTokenToSquare(location, board);
        });
        addVisualTokenToSquare(captureSquare, board);
        return { board, square };
      },
    });
    return { events };
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
      id: Math.random(), // TODO: We should change this sometime because collisions would be bad
    },
  });
};
