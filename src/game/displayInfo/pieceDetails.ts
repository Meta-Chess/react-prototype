import { PieceName } from "game/types";

export const pieceDetails: { [name in PieceName]: { name: string } } = {
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
  [PieceName.RookKnight]: {
    name: "Marshal",
  },
  [PieceName.BishopKnight]: {
    name: "Cardinal",
  },
  [PieceName.FirePiece]: {
    name: "Fire Piece",
  },
  [PieceName.WaterPiece]: {
    name: "Water Piece",
  },
  [PieceName.EarthPiece]: {
    name: "Earth Piece",
  },
  [PieceName.LightningPiece]: {
    name: "Lightning Piece",
  },
};

export const pieceDisplayOrder = [
  PieceName.King,
  PieceName.Queen,
  PieceName.RookKnight,
  PieceName.BishopKnight,
  PieceName.Rook,
  PieceName.Bishop,
  PieceName.Knight,
  PieceName.Pawn,
];
