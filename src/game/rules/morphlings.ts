import { PieceName } from "../types";
import { Rule } from "./CompactRules";
import { Gait } from "game/types/types";

const PIECE_MUTATOR: { [key in PieceName]?: PieceName } = {
  [PieceName.Knight]: PieceName.Bishop,
  [PieceName.Bishop]: PieceName.Knight,
};

export const morphlings: Rule = {
  title: "Morphlings",
  description:
    "When knights move they turn into bishops and when bishops move they turn into knights",

  onPieceDisplaced: ({ board, pieceDelta }) => {
    const piece = board.getPiece(pieceDelta.pieceId);
    if (piece) {
      const newPieceName = PIECE_MUTATOR[piece.name];
      if (newPieceName !== undefined) {
        piece.name = newPieceName;
        piece.generateGaits =
          board.interrupt.for.getGaitGenerator({
            name: newPieceName,
          }).gaitGenerator || ((): Gait[] => []);
      }
    }
    return { board, pieceDelta };
  },
};
