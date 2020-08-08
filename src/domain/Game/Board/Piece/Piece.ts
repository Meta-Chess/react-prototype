import { PieceType, Player, PieceAttributes, Gait, GaitParams } from "domain/Game/types";

class Piece {
  id: number;
  constructor(
    public location: string,
    public type: PieceType,
    public generateGaits: (_?: GaitParams) => Gait[],
    public owner: Player,
    public attributes: PieceAttributes = {}
  ) {
    this.id = Math.random();
  }
}

export { Piece };
