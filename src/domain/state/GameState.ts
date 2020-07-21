import { Variant } from "domain/State/Variants";
import { Board } from "./Board";

export class GameState {
  constructor(
    public board: Board,
    public variants: Variant[],
    public format: Format // private history: GameHistory
  ) {}

  static createEmptyGameState() {
    return new GameState(Board.createEmptyBoard(), [], Format.default);
  }

  static createBasicGameState() {
    return new GameState(Board.createBasicBoard(), [], Format.default);
  }

  static createStandardGameState() {
    return new GameState(Board.createStandardBoard(), [], Format.default);
  }
}

enum Format {
  default,
}
