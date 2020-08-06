import { Variant } from "domain/Game/Variants";
import { Board } from "./Board";
import { Renderer } from "./Renderer";
import { Clock } from "./Clock";
import { Player } from "./types";
import { Square, Piece } from "./Board";
import { Pather } from "./Pather";
import { flatMap } from "lodash";

export class Game {
  public clock: Clock;
  public players: Player[];
  public selectedPieces: Piece[];
  public allowableLocations: string[];
  public pather: Pather;

  constructor(
    public board: Board,
    public variants: Variant[],
    public format: Format,
    public renderer: Renderer
  ) {
    this.clock = new Clock([Player.White, Player.Black], 20000);
    this.clock.setActivePlayers([Player.Black]);
    this.players = [Player.White, Player.Black];
    this.selectedPieces = [];
    this.allowableLocations = [];
    this.pather = new Pather();
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

  onPress(square: Square): void {
    this.selectedPieces = square.pieces;
    this.allowableLocations = flatMap(this.selectedPieces, (p: Piece) =>
      this.pather.path(p)
    );
    this.render();
  }
}

enum Format {
  default,
}
