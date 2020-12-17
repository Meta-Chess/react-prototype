import { Game } from "game";
import { SquareShape, TokenName } from "game/types";

export interface BoardMeasurements {
  width: number;
  height: number;
  squareSize: number;
  boardPadding: number;
  spacings: number[];
  rankAndFileBounds: {
    minRank: number;
    maxRank: number;
    minFile: number;
    maxFile: number;
  };
}

export function calculateBoardMeasurements({
  game,
  boardAreaWidth,
  boardAreaHeight,
  shape,
  backboard,
}: {
  game: Game;
  boardAreaWidth: number;
  boardAreaHeight: number;
  shape: SquareShape | undefined;
  backboard: boolean;
}): BoardMeasurements {
  // TODO: Board margins
  const boardPadding = backboard ? 8 : 0;

  const { minRank, maxRank, minFile, maxFile } = game.board.rankAndFileBoundsWithFilter(
    (square) => !square.hasTokenWithName(TokenName.InvisibilityToken)
  );

  const numberOfRanks = maxRank - minRank + 1;
  const numberOfFiles = maxFile - minFile + 1;

  const boardWidthInSquares = numberOfFiles;
  const boardHeightInSquares =
    shape === SquareShape.Hex
      ? Math.ceil(numberOfRanks / 2) * 1.1547 // 2 / sqrt(3)
      : numberOfRanks;

  const squareSize = Math.min(
    (boardAreaWidth - 2 * boardPadding) / boardWidthInSquares,
    (boardAreaHeight - 2 * boardPadding) / numberOfRanks,
    120
  );

  const spacings = shape === SquareShape.Hex ? [0.1547 * squareSize] : [];

  return {
    width: squareSize * boardWidthInSquares + 2 * boardPadding,
    height: squareSize * boardHeightInSquares + 2 * boardPadding,
    squareSize,
    boardPadding,
    spacings,
    rankAndFileBounds: { minRank, maxRank, minFile, maxFile },
  };
}
