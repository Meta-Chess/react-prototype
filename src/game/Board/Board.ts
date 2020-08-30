import { Piece } from "./Piece";
import { Square } from "./Square";
import { Adjacency } from "./Adjacencies";
import { RankAndFileBounds, Rule, Token, TokenName } from "game/types";
import { applyInSequence } from "utilities";
import * as _ from "lodash";

interface LocationMap {
  [key: string]: Square;
}

class Board {
  constructor(public squares: LocationMap = {}, public tokens: Token[] = []) {}

  // TODO: consider making this a "property" or whatever it's called?
  pieces(): Piece[] {
    return Object.values(this.squares)
      .map((square) => square.pieces)
      .flat();
  }

  // TODO: Clean up all methods, particularly token methods with extension
  addToken(token: Token): void {
    this.tokens.push(token);
  }

  addTokens(tokens: Token[]): void {
    this.tokens.push(...tokens);
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

  addSquare({ location, square }: { location: string; square: Square }): void {
    this.squares = { ...this.squares, [location]: square };
  }

  addSquares(squares: { location: string; square: Square }[] | undefined): void {
    squares?.forEach((s) => this.addSquare(s));
  }

  addAdjacenciesByRule(rule: ((square: Square) => Adjacency[]) | undefined): void {
    if (!rule) return;
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

  addPieceTokensByRule(rule: (piece: Piece) => Token[]): void {
    this.pieces().forEach((piece) => piece.addTokens(rule(piece)));
  }

  rankAndFileBounds(): RankAndFileBounds {
    return this.rankAndFileBoundsWithFilter(() => true);
  }

  rankAndFileBoundsWithFilter(filter: (s: Square) => boolean): RankAndFileBounds {
    const squares = Object.values(this.squares).filter(filter);
    const ranks = squares.map((s) => s.coordinates.rank);
    const files = squares.map((s) => s.coordinates.file);
    return {
      minRank: ranks.length === 0 ? 0 : Math.min(...ranks),
      maxRank: ranks.length === 0 ? 0 : Math.max(...ranks),
      minFile: files.length === 0 ? 0 : Math.min(...files),
      maxFile: files.length === 0 ? 0 : Math.max(...files),
    };
  }

  squaresByCondition(condition: (s: Square) => boolean): Square[] {
    return Object.values(this.squares).filter(condition);
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

  isEmpty(): boolean {
    return _.isEmpty(this.squares);
  }

  static createEmptyBoard(): Board {
    return new Board({});
  }

  static createBoard(rules: Rule[]): Board {
    let board = new Board();

    ({ board } = applyInSequence(
      rules.map((r) => r?.forSquareGenerationModify),
      { board }
    ));

    ({ board } = applyInSequence(
      rules.map((r) => r?.onBoardCreatedModify),
      { board }
    ));

    return board;
  }
}

export { Board };
