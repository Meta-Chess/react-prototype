import { Variant } from "domain/State/Variants";
import { Board } from "./Board";
import { Renderer } from "./Renderer";
import { Clock } from "./Clock";
import { Player } from "./types";

export class GameState {
  public clock: Clock;
  public players: Player[];

  constructor(
    public board: Board,
    public variants: Variant[],
    public format: Format,
    public renderer: Renderer
  ) {
    this.clock = new Clock([Player.White, Player.Black], 20000);
    this.clock.setActivePlayers([Player.Black]);
    this.players = [Player.White, Player.Black];
  }

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

  render(): void {
    this.renderer.render();
  }
}

enum Format {
  default,
}
