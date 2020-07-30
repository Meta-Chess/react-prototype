import {
  PieceType,
  MoveGenerator,
  Player,
  PieceAttributes,
} from "domain/State/types";

class Piece {
  id: number;
  constructor(
    public location: string,
    public type: PieceType,
    public moveGenerators: MoveGenerator[],
    public owner: Player,
    public attributes?: PieceAttributes,
    public active = false
  ) {
    this.id = Math.random();
  }
}

export { Piece };
