import { Piece } from "./Piece";
import { Square } from "./Square";
import { standardSetup } from "./Setups";
import { Adjacency } from "./Adjacencies";

interface LocationMap {
  [key: string]: Square;
}

class Board {
  constructor(public squares: LocationMap = {}) {}

  addSquare({ location, square }: { location: string; square: Square }): void {
    this.squares = { ...this.squares, [location]: square };
  }

  addSquares(squares: { location: string; square: Square }[]): void {
    squares.forEach((s) => this.addSquare(s));
  }

  addAdjacenciesByRule(rule: (square: Square) => Adjacency[]): void {
    const locations = Object.keys(this.squares);
    const squares = Object.values(this.squares);
    squares.forEach((square) => {
      const desiredAdjacencies = rule(square);
      const newAdjacencies = desiredAdjacencies.filter((adjacency) =>
        locations.includes(adjacency.location)
      );
      square.addAdjacencies(newAdjacencies);
    });
  }

  addPiecesByRule(rule: (square: Square) => Piece[]): void {
    const squares = Object.values(this.squares);
    squares.forEach((square) => {
      square.addPieces(rule(square));
    });
  }

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

  static createStandardBoard(): Board {
    const board = new Board();
    board.addSquares(standardSetup.squares);
    board.addAdjacenciesByRule(standardSetup.adjacenciesRule);
    // board.addAdjacenciesByRule(cylindricalAdjacenciesRule);
    board.addPiecesByRule(standardSetup.piecesRule);
    return board;
  }
}

export { Board };
