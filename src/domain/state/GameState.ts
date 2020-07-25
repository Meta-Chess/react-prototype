import { Variant } from "domain/State/Variants";
import { Board } from "./Board";
import { Renderer } from "./Renderer";

export class GameState {
  constructor(
    public board: Board,
    public variants: Variant[],
    public format: Format,
    public renderer: Renderer
  ) {}

  static createEmptyGameState(renderer: Renderer): GameState {
    return new GameState(
      Board.createEmptyBoard(),
      [],
      Format.default,
      renderer
    );
  }

  static createBasicGameState(renderer: Renderer): GameState {
    return new GameState(
      Board.createBasicBoard(),
      [],
      Format.default,
      renderer
    );
  }

  static createStandardGameState(renderer: Renderer): GameState {
    return new GameState(
      Board.createStandardBoard(),
      [],
      Format.default,
      renderer
    );
  }

  render() {
    this.renderer.render();
  }
}

enum Format {
  default,
}
