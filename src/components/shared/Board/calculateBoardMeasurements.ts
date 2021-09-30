import { Board, SquareShape, TokenName } from "game";

export interface BoardMeasurements {
  width: number;
  height: number;
  squareSize: number;
  boardPaddingHorizontal: number;
  boardPaddingVertical: number;
  spacings: number[];
  rankAndFileBounds: {
    minRank: number;
    maxRank: number;
    minFile: number;
    maxFile: number;
  };
  boardAreaWidth: number;
  boardAreaHeight: number;
}

export function calculateBoardMeasurements({
  board,
  boardAreaWidth,
  boardAreaHeight,
  shape,
  backboard,
}: {
  board: Board;
  boardAreaWidth: number;
  boardAreaHeight: number;
  shape: SquareShape | undefined;
  backboard: boolean;
}): BoardMeasurements {
  const boardPaddingHorizontal = shape === SquareShape.Hex ? 12 : backboard ? 8 : 0;
  const boardPaddingVertical = backboard ? (shape === SquareShape.Hex ? 16 : 8) : 0;

  const { minRank, maxRank, minFile, maxFile } = board.rankAndFileBoundsWithFilter(
    (square) => !square.hasTokenWithName(TokenName.InvisibilityToken)
  );

  const numberOfRanks = maxRank - minRank + 1;
  const numberOfFiles = maxFile - minFile + 1;

  const boardWidthInSquares = numberOfFiles;
  const boardHeightInSquares =
    shape === SquareShape.Hex
      ? Math.ceil(numberOfRanks / 2) * 1.1547 // 1.1547 ~= 2 / sqrt(3)
      : numberOfRanks;

  const squareSize = Math.min(
    (boardAreaWidth - 2 * boardPaddingHorizontal) / boardWidthInSquares,
    (boardAreaHeight - 2 * boardPaddingVertical) / boardHeightInSquares,
    120
  );

  const spacings = shape === SquareShape.Hex ? [0.1547 * squareSize] : [];

  return {
    width: squareSize * boardWidthInSquares + 2 * boardPaddingHorizontal,
    height: squareSize * boardHeightInSquares + 2 * boardPaddingVertical,
    squareSize,
    boardPaddingHorizontal,
    boardPaddingVertical,
    spacings,
    rankAndFileBounds: { minRank, maxRank, minFile, maxFile },
    boardAreaWidth,
    boardAreaHeight,
  };
}
