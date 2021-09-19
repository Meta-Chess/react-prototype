import { Rule, ParameterRule, OnPieceDisplaced } from "../CompactRules";
import { createPieceMutator, mutatePiece } from "../utilities";

// TODO: this should be in the same place as promotion
export const morphlings: ParameterRule<"morphlings"> = ({
  "Piece Cycles": pieceCycles,
}): Rule => {
  return {
    title: "Morphlings",
    description:
      "When knights move they turn into bishops and when bishops move they turn into knights.",

    onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
      const piece = board.getPiece(pieceDelta.pieceId);
      if (piece) {
        const newPieceName = createPieceMutator(pieceCycles)[piece.name];
        mutatePiece(piece, newPieceName, board);
      }
      return { board, pieceDelta };
    },
  };
};
