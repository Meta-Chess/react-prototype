import { TokenName } from "game/types";

interface Details {
  name: string;
  description: string;
}

export const tokenDetails: { [k in TokenName]: Details } = {
  [TokenName.PawnDoubleStep]: {
    name: "Pawn double step",
    description:
      "This piece can move two pawn steps. This token will be removed when the piece moves.",
  },
  [TokenName.PolarToken]: {
    name: "Polar token",
    description:
      "This square will rotate the move patterns of pieces by half a revolution when they land on it.",
  },
  [TokenName.MoveHistory]: {
    name: "Move history",
    description: "This piece remembers where it's been.",
  },
  [TokenName.InvisibilityToken]: {
    name: "Invisibility token",
    description: "You can't see me!",
  },
  [TokenName.Shape]: {
    name: "Shape",
    description: "This board might have a special layout!",
  },
  [TokenName.ActiveCastling]: {
    name: "Active castling",
    description: "This piece can castle like a king can in normal chess.",
  },
  [TokenName.PassiveCastling]: {
    name: "Passive castling",
    description: "This piece can be castled with like a rook can in normal chess.",
  },
  [TokenName.CaptureToken]: {
    name: "Capture token",
    description: "This piece can be taken by moving to another square.",
  },
  [TokenName.Fatigue]: {
    name: "Fatigue",
    description: "This piece can't move until next turn!",
  },
};