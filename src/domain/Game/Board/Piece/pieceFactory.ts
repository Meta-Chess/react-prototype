import * as gaits from "./defaultGaits";
import { Piece } from "./Piece";
import { PieceType, Player } from "domain/Game/types";

export function createRook(location: string, owner: Player): Piece {
  return new Piece(location, PieceType.Rook, () => gaits.ROOK_GAITS, owner);
}

export function createBishop(location: string, owner: Player): Piece {
  return new Piece(location, PieceType.Bishop, () => gaits.BISHOP_GAITS, owner);
}

export function createQueen(location: string, owner: Player): Piece {
  return new Piece(location, PieceType.Queen, () => gaits.QUEEN_GAITS, owner);
}

export function createKnight(location: string, owner: Player): Piece {
  return new Piece(location, PieceType.Knight, () => gaits.KNIGHT_GAITS, owner);
}

export function createKing(location: string, owner: Player): Piece {
  return new Piece(location, PieceType.King, () => gaits.KING_GAITS, owner);
}

export function createPawn(location: string, owner: Player): Piece {
  return owner === Player.White
    ? new Piece(location, PieceType.Pawn, () => gaits.WHITE_PAWN_GAITS, owner, {
        pawnDoubleStep: true,
      })
    : new Piece(location, PieceType.Pawn, () => gaits.BLACK_PAWN_GAITS, owner, {
        pawnDoubleStep: true,
      });
}
