import { Square } from "./Square";
import { Piece } from "./Square/Piece";
import { PieceType, Player } from "domain/State/types";
import { standardSetup, minimalSetup } from "./Setups";

interface LocationMap {
  [key: string]: Square;
}

class Board {
  constructor(public squares: LocationMap) {}

  //TODO: PURGE
  squaresWithRankAndFile({
    rank,
    file,
  }: {
    rank: number;
    file: number;
  }): Square[] {
    return Object.values(this.squares).filter(
      (s) => s.coordinates.rank === rank && s.coordinates.file === file
    );
  }

  squareAt(location: string): Square {
    return this.squares[location];
  }

  static createEmptyBoard() {
    return new Board({});
  }

  static createBasicBoard() {
    return new Board(minimalSetup);
  }

  static createStandardBoard() {
    return new Board(standardSetup);
  }
}

export { Board };
