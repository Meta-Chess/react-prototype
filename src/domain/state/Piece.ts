import { Square } from "./Square";

export class Piece {
  constructor(
    private location: Square,
    private type: PieceType,
    private moves: Move[],
    private owner: Player,
    private attributes: PieceAttributes
  ) {}
}

enum PieceType {
  Pawn,
  Rook,
  King,
  Queen,
  Bishop,
  Knight,
}
