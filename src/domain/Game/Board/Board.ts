import { Piece } from "./Piece";
import { Square } from "./Square";
import { standardSetup, minimalSetup } from "./Setups";

interface LocationMap {
  [key: string]: Square;
}

/*
interface Move {
  pieceArray: Piece[];
  destArray: Square[];
}
*/

class Board {
  constructor(
    public squares: LocationMap,
    public adminPieces: Piece[] = [],
    public adminSquares: Square[] = []
  ) {}

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

  updateAdminMove(pieces: Piece[], squares: Square[]): void {
    const square = squares[0];

    if (this.adminPieces.length === 0 && this.adminSquares.length === 0) {
      if (pieces.length === 0) {
        //do nothing
      } else {
        this.adminPieces = pieces;
        this.adminSquares = [square];
      }
    } else {
      if (pieces.length === 0) {
        this.adminSquares[0].pieces = [];
        square.pieces = this.adminPieces;

        this.adminPieces = [];
        this.adminSquares = [];
      } else {
        if (pieces === this.adminPieces) {
          this.adminPieces = [];
          this.adminSquares = [];
        } else {
          this.adminSquares[0].pieces = [];
          square.pieces = this.adminPieces;

          this.adminPieces = [];
          this.adminSquares = [];
        }
      }
    }
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
