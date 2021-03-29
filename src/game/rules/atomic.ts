import { PieceName, AnimationType } from "../types";
import { Rule } from "./CompactRules";
import { allAdjacencies, addAnimationTokenToSquare } from "./utilities";

export const atomic: Rule = {
  title: "Atomic",
  description:
    "When a piece is captured, all pieces on adjacent squares are destroyed. Pawns shield their square from this effect. The capturing piece is also destroyed.",

  subscribeToEvents: ({ events }) => {
    events.subscribe({
      name: "capture",
      consequence: ({ board, square }) => {
        const animationQueuePosition = board.animationDelayQueue.addToQueue(
          ANIMATION_DURATION
        ); // todo?: if multiple captures were to happen in the same move, they would be processed as different animations
        const atomicImpactSquares = allAdjacencies(board, square);
        const captureSquare = square.location;
        board.killPiecesAt({ piecesLocation: captureSquare });
        atomicImpactSquares.forEach((location) => {
          if (!board.getPiecesAt(location).some((piece) => piece.name === PieceName.Pawn))
            board.killPiecesAt({ piecesLocation: location });
          addAnimationTokenToSquare({
            board: board,
            squareLocation: location,
            duration: ANIMATION_DURATION,
            delay: 0,
            animationType: AnimationType.explosion,
            animationQueuePosition,
          });
        });
        addAnimationTokenToSquare({
          board: board,
          squareLocation: captureSquare,
          duration: ANIMATION_DURATION,
          delay: 0,
          animationType: AnimationType.explosion,
          animationQueuePosition,
        });
        return { board, square };
      },
    });
    return { events };
  },
};

const ANIMATION_DURATION = 400;
