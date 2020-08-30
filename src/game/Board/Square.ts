import { Piece } from "./Piece";
import { Adjacencies, Adjacency } from "./Adjacencies";
import { Player, Token, TokenName } from "game/types";

interface Coordinates {
  rank: number;
  file: number;
}

export class Square {
  constructor(
    public location: string,
    public coordinates: Coordinates, // TODO: Generalise coordinates to accept things other than rank and file
    public tokens: Token[] = [],
    public adjacencies: Adjacencies = new Adjacencies(),
    public pieces: Piece[] = []
  ) {}

  getPieceArray(): Piece[] {
    return this.pieces;
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

  // Token stuff - should probably extract to a superclass of square and piece
  addToken(token: Token): void {
    this.tokens.push(token);
  }

  private filterTokensByRule(rule: (token: Token) => boolean): void {
    this.tokens = this.tokens.filter(rule);
  }

  removeTokensByName(name: TokenName): void {
    this.filterTokensByRule((token) => token.name !== name);
  }

  private firstTokenSatisfyingRule(rule: (token: Token) => boolean): Token | undefined {
    return this.tokens.find(rule);
  }

  firstTokenWithName(name: TokenName): Token | undefined {
    return this.firstTokenSatisfyingRule((token) => token.name === name);
  }

  private hasTokenSatisfyingRule(rule: (token: Token) => boolean): boolean {
    return this.tokens.some(rule);
  }

  hasTokenWithName(name: TokenName): boolean {
    return this.hasTokenSatisfyingRule((token) => token.name === name);
  }
}
