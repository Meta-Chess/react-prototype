import { TokenName } from "game/types";
import { Rule } from ".";

export const Interception: Rule = {
  title: "Interception",
  description:
    "Enables interceptable moves where pieces can be captured by moving to a square that they moved through",
  postMove: ({ board, move, currentTurn }) => {
    if (move.data?.interceptable) {
      const start = move.data?.interceptableAtStart ? 0 : 1;

      move.pieceDeltas
        .find((delta) => delta.pieceId === move.pieceId)
        ?.path.getPath()
        .slice(start, -1)
        .forEach((location) => {
          const interceptionToken = {
            name: TokenName.CaptureToken,
            expired: (turn: number): boolean => {
              return turn >= currentTurn + 1;
            },
            data: {
              pieceId: move.pieceId,
              condition: move.data?.interceptionCondition,
            },
          };

          board.squareAt(location)?.addToken(interceptionToken);
        });
    }

    return { board, move, currentTurn };
  },

  onCapture: ({ board, piece, location, captureHappened }) => {
    const square = board.squares[location];

    // TODO: Handle multiple capture tokens on the same square
    const captureToken = square.firstTokenWithName(TokenName.CaptureToken);

    const captureIsAllowed = captureToken?.data?.condition?.(piece) || false;

    if (captureToken?.data?.pieceId && captureToken?.data?.condition?.(piece)) {
      const interceptedPiece = board.pieces[captureToken?.data?.pieceId];
      const interceptionSquare = board.squares[interceptedPiece.location];
      interceptionSquare.pieces = [];

      board.killPiece(captureToken?.data?.pieceId);
    }

    captureHappened = captureHappened || captureIsAllowed;
    return { board, piece, location, captureHappened };
  },

  moveIsAggressive: ({ move, board, aggressive }) => ({
    move,
    board,
    aggressive:
      aggressive ||
      board
        .squareAt(move.location)
        ?.tokensWithName(TokenName.CaptureToken)
        .some((token) => {
          const piece = board.getPiece(move.pieceId);
          return piece && token.data?.condition?.(piece);
        }) ||
      false,
  }),
};
