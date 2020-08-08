import { PieceType, Player, PieceAttributes, Gait } from "domain/Game/types";

class Piece {
  id: number;
  constructor(
    public location: string,
    public type: PieceType,
    public generateGaits: () => Gait[],
    public owner: Player,
    public attributes?: PieceAttributes,
    public active = false
  ) {
    this.id = Math.random();
  }

  static createPawn(location: string, owner: Player): Piece {
    return new Piece(location, PieceType.Pawn, () => [], owner);
  }

  static createKing(location: string, owner: Player): Piece {
    return new Piece(location, PieceType.King, () => [], owner);
  }
}

export { Piece };
