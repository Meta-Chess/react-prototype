import { PieceName } from "../types";
import { Rule } from "./CompactRules";
import { Gait } from "game/types/types";

// PARAM CONSTRAINT: pieces cannot be a member of multiple cycles
// const PIECE_CYCLES = [[PieceName.Knight, PieceName.Bishop]];
const PIECE_CYCLES = [[PieceName.Knight, PieceName.Bishop]];

type PieceMutator = { [key in PieceName]?: PieceName };
const createPieceMutator = (pieceCycles: PieceName[][]): PieceMutator => {
  return Object.assign(
    {},
    ...pieceCycles.flatMap((pieceCycle: PieceName[]) =>
      pieceCycle.map((p, i, c) => ({ [p]: c[(i + 1) % pieceCycle.length] }))
    )
  );
};

const pieceMutator = createPieceMutator(PIECE_CYCLES);

export const morphlings: Rule = {
  title: "Morphlings",
  description:
    "When knights move they turn into bishops and when bishops move they turn into knights",

  onPieceDisplaced: ({ board, pieceDelta }) => {
    const piece = board.getPiece(pieceDelta.pieceId);
    if (piece) {
      const newPieceName = pieceMutator[piece.name];
      if (newPieceName !== undefined) {
        piece.name = newPieceName;
        piece.generateGaits =
          board.interrupt.for.getGaitGenerator({
            name: newPieceName,
            owner: piece.owner,
          }).gaitGenerator || ((): Gait[] => []);
      }
    }
    return { board, pieceDelta };
  },
};
