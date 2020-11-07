import { TokenName } from "game/types";
import { Rule } from ".";

export const Interception: Rule = {
  name: "Interception",
  description: "",
  postMove: ({ board, move, currentTurn }) => {
    if (move.data?.interceptable) {
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
              data: {
                pieceId: move.pieceId,
                condition: move.data?.interceptionCondition,
              },
            };

            board.squareAt(location)?.addToken(interceptionToken);
          });
      });
    }
    return { board, move, currentTurn };
  },

  onCapture: ({ board, piece, location, captureHappened }) => {
    const square = board.squares[location];
    const captureToken = square.firstTokenWithName(TokenName.CaptureToken);

    const captureIsAllowed = captureToken?.data?.condition?.(piece) || false;

    if (captureToken?.data?.pieceId && captureToken?.data?.condition?.(piece)) {
      const interceptedPiece = board.pieces[captureToken?.data?.pieceId];
      const interceptionSquare = board.squares[interceptedPiece.location];
      interceptionSquare.pieces = [];

      board.pieces = Object.keys(board.pieces)
          .filter((id: string) => !(captureToken?.data?.pieceId === id))
          .reduce(
              (acc, id) => ({
                ...acc,
                [id]: board.pieces[id],
              }),
              {}
          );
    }

    captureHappened = captureHappened || captureIsAllowed;
    return { board, piece, location, captureHappened };
  },
};
