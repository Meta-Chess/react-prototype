import { PieceType, Player, Token, TokenName, Gait, GaitParams } from "domain/Game/types";

class Piece {
  id: number;
  constructor(
    public location: string,
    public type: PieceType,
    public generateGaits: (_?: GaitParams) => Gait[],
    public owner: Player,
    public tokens: Token[] = []
  ) {
    this.id = Math.random();
  }

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

export { Piece };
