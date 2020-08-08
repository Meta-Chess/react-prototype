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
  squaresWithRankAndFile({ rank, file }: { rank: number; file: number }): Square[] {
    return Object.values(this.squares).filter(
      (s) => s.coordinates.rank === rank && s.coordinates.file === file
    );
  }

  displace({ piece, destination }: { piece: Piece; destination: string }): void {
    const startSquare = this.squareAt(piece.location);
    const endSquare = this.squareAt(destination);
    if (startSquare && endSquare) {
      startSquare.pieces = startSquare.pieces.filter((p) => p.id != piece.id);
      piece.location = destination;
      endSquare.pieces.push(piece);
    }
  }

  killPiecesAt(location: string): void {
    // TODO: This should actually move the pieces to a special square
    this.squares[location].pieces = [];
  }

  squareAt(location?: string): Square | undefined {
    return location ? this.squares[location] : undefined;
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
