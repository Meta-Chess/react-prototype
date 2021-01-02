import { Token, TokenName } from "game/types";

export class TokenOwner {
  constructor(public tokens: Token[] = []) {}

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

  removeTokensByNames(names: TokenName[]): void {
    this.filterTokensByRule((token) => !names.includes(token.name));
  }

  removeExpiredTokens(currentTurn: number): void {
    this.tokens = this.tokens.filter((token) => !token.expired(currentTurn));
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

  tokensWithName(name: TokenName): Token[] {
    return this.tokensSatisfyingRule((token) => token.name === name);
  }

  tokensSatisfyingRule(rule: (token: Token) => boolean): Token[] {
    return this.tokens.filter(rule);
  }
}
