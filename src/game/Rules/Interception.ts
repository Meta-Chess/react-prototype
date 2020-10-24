import { TokenName } from "game/types";
import { isPresent } from "utilities/";
import { Rule } from ".";

export const Interception: Rule = {
  name: "Interception",
  description: "",
  postMove: ({ board, move, currentTurn }) => {
    move.pieceDeltas.forEach((pieceDelta) => {
      pieceDelta.path
        .getPath()
        .slice(0, -1)
        .forEach((location) => {
          const interceptionToken = {
            name: TokenName.CaptureToken,
            expired: (turn: number): boolean => {
              return turn >= currentTurn + 1;
            },
            data: { pieceId: move.pieceId },
          };

          board.squareAt(location)?.addToken(interceptionToken);
        });
    });
    return { board, move, currentTurn };
  },

  onCapture: ({ board, location, captureHappened }) => {
    const square = board.squares[location];
    const captureToken = square.firstTokenWithName(TokenName.CaptureToken);

    if (captureToken?.data?.pieceId) {
      const interceptedPiece = board.pieces[captureToken?.data?.pieceId];
      const interceptionSquare = board.squares[interceptedPiece.location];
      interceptionSquare.pieces = [];
    }

    board.pieces = Object.keys(board.pieces)
      .filter((id: string) => !(captureToken?.data?.pieceId === id))
      .reduce(
        (acc, id) => ({
          ...acc,
          [id]: board.pieces[id],
        }),
        {}
      );

    captureHappened = captureHappened || isPresent(captureToken);

    return { board, location, captureHappened };
  },
};
