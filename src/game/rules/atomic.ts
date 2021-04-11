import { PieceName, AnimationType } from "../types";
import { Rule, ParameterRule, SubscribeToEvents } from "./CompactRules";
import { allAdjacencies, addAnimationTokenToSquare } from "./utilities";

export const atomic: ParameterRule = (): Rule => {
  return {
    title: "Atomic",
    description:
      "When a piece is captured, all pieces on adjacent squares are destroyed. Pawns shield their square from this effect. The capturing piece is also destroyed.",

    subscribeToEvents: ({ events }): SubscribeToEvents => {
      events.subscribe({
        name: "capture",
        consequence: ({ board, square }) => {
          const atomicImpactSquares = allAdjacencies(board, square);
          const captureSquare = square.location;
          board.killPiecesAt({ piecesLocation: captureSquare });
          atomicImpactSquares.forEach((location) => {
            if (
              !board.getPiecesAt(location).some((piece) => piece.name === PieceName.Pawn)
            )
              board.killPiecesAt({ piecesLocation: location });
            addAnimationTokenToSquare({
              board: board,
              squareLocation: location,
              duration: ANIMATION_DURATION,
              delay: 0,
              animationType: AnimationType.explosion,
            });
          });
          addAnimationTokenToSquare({
            board: board,
            squareLocation: captureSquare,
            duration: ANIMATION_DURATION,
            delay: 0,
            animationType: AnimationType.explosion,
          });
          return { board, square };
        },
      });
      return { events };
    },
  };
};

const ANIMATION_DURATION = 1000;
