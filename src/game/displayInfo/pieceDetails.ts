import { PieceName } from "game/types";

export const pieceDetails = {
  [PieceName.Pawn]: {
    name: "Pawn",
  },
  [PieceName.Rook]: {
    name: "Rook",
  },
  [PieceName.King]: {
    name: "King",
  },
  [PieceName.Queen]: {
    name: "Queen",
  },
  [PieceName.Bishop]: {
    name: "Bishop",
  },
  [PieceName.Knight]: {
    name: "Knight",
  },
};

export const pieceDisplayOrder = [
  PieceName.King,
  PieceName.Queen,
  PieceName.Rook,
  PieceName.Bishop,
  PieceName.Knight,
  PieceName.Pawn,
];
