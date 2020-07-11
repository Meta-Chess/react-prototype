import {
  PieceInterface,
  SquareInterface,
  PieceType,
  MoveGenerator,
  Player,
  PieceAttributes,
} from "./types";

class Piece implements PieceInterface {
  constructor(
    public location: SquareInterface,
    public type: PieceType,
    public moveGenerators: MoveGenerator[],
    public owner: Player,
    public attributes: PieceAttributes
  ) {}
}

export { Piece };
