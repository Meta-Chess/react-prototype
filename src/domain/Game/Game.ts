import { Variant } from "domain/Game/Variants";
import { Board } from "./Board";
import { Renderer } from "./Renderer";
import { Clock } from "./Clock";
import { Player } from "./types";

export class Game {
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

  static createEmptyGame(renderer: Renderer): Game {
    return new Game(Board.createEmptyBoard(), [], Format.default, renderer);
  }

  static createBasicGame(renderer: Renderer): Game {
    return new Game(Board.createBasicBoard(), [], Format.default, renderer);
  }

  static createStandardGame(renderer: Renderer): Game {
    return new Game(Board.createStandardBoard(), [], Format.default, renderer);
  }

  render(): void {
    this.renderer.render();
  }
}

enum Format {
  default,
}
