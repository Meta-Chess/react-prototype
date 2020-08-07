import {
  PieceType,
  Player,
  PieceAttributes,
  MovePattern,
} from "domain/Game/types";
import { Direction } from "domain/Game/Direction";

class Piece {
  id: number;
  constructor(
    public location: string,
    public type: PieceType,
    public movePatterns: MovePattern[],
    public owner: Player,
    public attributes?: PieceAttributes,
    public active = false
  ) {
    this.id = Math.random();
  }

  static createPawn(location: string, owner: Player): Piece {
    return new Piece(location, PieceType.Pawn, [], owner);
  }

  static createBishop(location: string, owner: Player): Piece {
    return new Piece(location, PieceType.Bishop, [], owner);
  }

  static createKnight(location: string, owner: Player): Piece {
    return new Piece(location, PieceType.Knight, [], owner);
  }

  static createRook(location: string, owner: Player): Piece {
    return new Piece(
      location,
      PieceType.Rook,
      [{ pattern: [Direction.N], repeats: true }],
      owner
    );
  }

  static createQueen(location: string, owner: Player): Piece {
    return new Piece(location, PieceType.Queen, [], owner);
  }

  static createKing(location: string, owner: Player): Piece {
    return new Piece(location, PieceType.King, [], owner);
  }
}

export { Piece };
