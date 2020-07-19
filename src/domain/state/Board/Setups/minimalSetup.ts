import { Square } from "../Square";
import { Piece } from "../Square/Piece";
import { PieceType, Player } from "domain/State/types";

export const minimalSetup = {
  Blah: new Square({}, [], { rank: 5, file: 5 }, {}),
  Foo: new Square(
    {},
    [
      new Piece("Blah", PieceType.Pawn, [], Player.Black, {}),
      new Piece("Blah", PieceType.King, [], Player.White, {}),
      new Piece("Blah", PieceType.Knight, [], Player.Black, {}),
    ],
    { rank: 1, file: 2 },
    {}
  ),
  Bar: new Square(
    {},
    [new Piece("Blah", PieceType.Queen, [], Player.White, {})],
    { rank: 2, file: 1 },
    {}
  ),
};
