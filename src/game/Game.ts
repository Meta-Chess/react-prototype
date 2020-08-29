import { Board, Piece, Square } from "./Board";
import { Renderer } from "./Renderer";
import { Clock } from "./Clock";
import { Player, Rule } from "./types";
import { Pather } from "./Pather";
import { flatMap } from "lodash";

export class Game {
  public clock: Clock;
  public players: Player[];
  public selectedPieces: Piece[];
  public allowableLocations: string[];
  public renderer: Renderer | undefined;
  public currentPlayer: Player;
  public currentTurn: number;

  constructor(public board: Board, public variants: Rule[], public format: Format) {
    this.clock = new Clock([Player.White, Player.Black], 20000);
    this.clock.setActivePlayers([Player.Black]);
    this.players = [Player.White, Player.Black];
    this.currentPlayer = Player.White;
    this.currentTurn = 1;
    this.selectedPieces = [];
    this.allowableLocations = [];
  }

  static createEmptyGame(): Game {
    return new Game(Board.createEmptyBoard(), [], Format.default);
  }

  static createGame(variants: Rule[]): Game {
    return new Game(Board.createBoard(variants), variants, Format.default);
  }

  giveRenderer(renderer: Renderer): void {
    if (!this.renderer) this.renderer = renderer;
  }

  render(): void {
    this.renderer?.render();
  }

  onPress(square: Square): void {
    // The onPress method should delegate to methods like adminMove (the body of which
    // is here) based on game phase and other settings (like admin move "on").
    if (this.selectedPieces.length === 0) {
      // select piece
      this.selectedPieces = square.pieces;

      if (this.currentPlayer !== square.pieces[0].owner) return;

      this.allowableLocations = flatMap(this.selectedPieces, (piece: Piece) =>
        new Pather(this.board, piece, this.variants).findPaths()
      );
    } else {
      if (this.allowableLocations.includes(square.location)) {
        // move pieces
        this.board.killPiecesAt(square.location);
        this.selectedPieces.forEach((piece) => {
          this.board.displace({ piece, destination: square.location });
        });
        this.variants.forEach((v) => {
          v.postMove?.({ piecesMoved: this.selectedPieces });
        });

        // change turn
        const currentIndex = this.players.indexOf(this.currentPlayer);
        this.players.length - 1 === currentIndex
          ? (this.currentPlayer = this.players[0])
          : (this.currentPlayer = this.players[currentIndex + 1]);
      }
      this.selectedPieces = [];
      this.allowableLocations = [];
    }

    this.render();
  }
}

enum Format {
  default,
}
