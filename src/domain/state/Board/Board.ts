import { Square } from "./Square";
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

  static createEmptyBoard(): Board {
    return new Board({});
  }

  static createBasicBoard(): Board {
    return new Board(minimalSetup);
  }

  static createStandardBoard(): Board {
    return new Board(standardSetup);
  }
}

export { Board };
