import { PieceName, PlayerName } from "game/types";

export type PieceSymbol =
  | ""
  | "P"
  | "N"
  | "B"
  | "R"
  | "Q"
  | "K"
  | "p"
  | "n"
  | "b"
  | "r"
  | "q"
  | "k"
  | "bn"
  | "rn"
  | "BN"
  | "RN";

export type RankSetup = { [rank: number]: PieceSymbol[] };

export const PIECE_SYMBOL_INFO: {
  [symbol: string]: { owner: PlayerName; name: PieceName };
} = {
  p: { owner: PlayerName.Black, name: PieceName.Pawn },
  n: { owner: PlayerName.Black, name: PieceName.Knight },
  b: { owner: PlayerName.Black, name: PieceName.Bishop },
  r: { owner: PlayerName.Black, name: PieceName.Rook },
  q: { owner: PlayerName.Black, name: PieceName.Queen },
  k: { owner: PlayerName.Black, name: PieceName.King },
  bn: { owner: PlayerName.Black, name: PieceName.BishopKnight },
  rn: { owner: PlayerName.Black, name: PieceName.RookKnight },
  P: { owner: PlayerName.White, name: PieceName.Pawn },
  N: { owner: PlayerName.White, name: PieceName.Knight },
  B: { owner: PlayerName.White, name: PieceName.Bishop },
  R: { owner: PlayerName.White, name: PieceName.Rook },
  Q: { owner: PlayerName.White, name: PieceName.Queen },
  K: { owner: PlayerName.White, name: PieceName.King },
  BN: { owner: PlayerName.White, name: PieceName.BishopKnight },
  RN: { owner: PlayerName.White, name: PieceName.RookKnight },
};
