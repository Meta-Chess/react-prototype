import { TokenName, AnimationType, PieceVisualData } from "game/types";
import { Board } from "game/Board";

export function addAnimationTokenToSquare({
  board,
  squareLocation,
  duration,
  delay,
  animationType = undefined,
  pieceVisualData = undefined,
}: {
  board: Board;
  squareLocation: string;
  duration: number;
  delay: number;
  animationType?: AnimationType;
  pieceVisualData?: PieceVisualData;
}): void {
  const creationTimeInMilliseconds = Date.now();
  board.squareAt(squareLocation)?.addToken({
    name: TokenName.AnimationToken,
    expired: () => Date.now() > creationTimeInMilliseconds + duration,
    data: {
      type: animationType,
      createdAt: creationTimeInMilliseconds,
      duration: duration,
      delay: delay,
      id: Math.random(), // TODO: We should change this sometime because collisions would be bad
      pieceVisualData: pieceVisualData,
    },
  });
}
