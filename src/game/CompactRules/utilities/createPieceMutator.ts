import { PieceName } from "game/types";

type PieceMutator = { [key in PieceName]?: PieceName };
export const createPieceMutator = (pieceCycles: PieceName[][]): PieceMutator => {
  return Object.assign(
    {},
    ...pieceCycles.flatMap((pieceCycle: PieceName[]) =>
      pieceCycle.map((pieceName, index, cycle) => ({
        [pieceName]: cycle[(index + 1) % pieceCycle.length],
      }))
    )
  );
};
