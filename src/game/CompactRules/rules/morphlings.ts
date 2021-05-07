import { PieceName } from "game/types";
import { Rule, ParameterRule, OnPieceDisplaced } from "../CompactRules";
import { Gait } from "game/types/types";
import { getDefaultParams } from "./utilities";

type PieceMutator = { [key in PieceName]?: PieceName };
const createPieceMutator = (pieceCycles: PieceName[][]): PieceMutator => {
  return Object.assign(
    {},
    ...pieceCycles.flatMap((pieceCycle: PieceName[]) =>
      pieceCycle.map((p, i, c) => ({ [p]: c[(i + 1) % pieceCycle.length] }))
    )
  );
};

export const morphlings: ParameterRule = (
  ruleParams = getDefaultParams("morphlingsSettings")
): Rule => {
  return {
    title: "Morphlings",
    description:
      "When knights move they turn into bishops and when bishops move they turn into knights",

    onPieceDisplaced: ({ board, pieceDelta }): OnPieceDisplaced => {
      const piece = board.getPiece(pieceDelta.pieceId);
      if (piece) {
        const newPieceName = createPieceMutator(ruleParams["Piece Cycles"] || [])[
          piece.name
        ];
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
};
