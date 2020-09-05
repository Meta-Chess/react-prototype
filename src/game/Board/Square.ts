import { Piece } from "./Piece";
import { Adjacencies, Adjacency } from "./Adjacencies";
import { Direction, Player, Token } from "game/types";
import { TokenOwner } from "./TokenOwner";

interface Coordinates {
  rank: number;
  file: number;
}

export class Square extends TokenOwner {
  constructor(
    public location: string,
    public coordinates: Coordinates,
    public tokens: Token[] = [],
    public adjacencies: Adjacencies = new Adjacencies(),
    public pieces: Piece[] = []
  ) {
    super(tokens);
  }

  clone(): Square {
    return new Square(
      this.location,
      this.coordinates,
      this.tokens,
      this.adjacencies.clone(),
      this.pieces.map((piece) => piece.clone())
    );
  }

  go(direction: Direction): string[] {
    return this.adjacencies.go(direction);
  }

  addPieces(pieces: Piece[]): void {
    this.pieces = [...this.pieces, ...pieces];
  }

  addAdjacencies(adjacencies: Adjacency[]): void {
    this.adjacencies.addAdjacencies(adjacencies);
  }

  getCoordinates(): Coordinates {
    return this.coordinates;
  }

  getLocation(): string {
    return this.location;
  }

  hasPiece(): boolean {
    return this.pieces.length !== 0;
  }

  hasPieceOf(pieces: Piece[]): boolean {
    const ids = pieces.map((p) => p.id);
    return this.pieces.some((piece) => ids.includes(piece.id));
  }

  hasPieceBelongingTo(owner: Player): boolean {
    return this.pieces.some((piece) => piece.owner === owner);
  }

  hasPieceNotBelongingTo(owner: Player): boolean {
    return this.pieces.some((piece) => piece.owner !== owner);
  }

  findPiecesByRule(rule: (p: Piece) => boolean): Piece[] {
    return this.pieces.filter(rule);
  }
}
