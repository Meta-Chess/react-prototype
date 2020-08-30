import { Board, Piece, Square } from "./Board";
import { Renderer } from "./Renderer";
import { Clock } from "./Clock";
import { Player, Rule } from "./types";
import { Pather } from "./Pather";
import { flatMap } from "lodash";
import { VariantName, variants } from "game/variants";

export class Game {
  public clock: Clock;
  public players: Player[];
  public selectedPieces: Piece[];
  public allowableLocations: string[];
  public currentPlayer: Player;
  public currentTurn: number;

  constructor(
    public board: Board,
    public rules: Rule[],
    public format: Format,
    public renderer: Renderer
  ) {
    this.clock = new Clock([Player.White, Player.Black], 300000);
    this.clock.setActivePlayers([Player.White]);
    this.players = [Player.White, Player.Black];
    this.currentPlayer = Player.White;
    this.currentTurn = 1;
    this.selectedPieces = [];
    this.allowableLocations = [];
  }

  static createGame(input: { variant: VariantName; renderer: Renderer }): Game {
    const rules = variants[input.variant].rules;
    return new Game(Board.createBoard(rules), rules, Format.default, input.renderer);
  }

  render(): void {
    this.renderer.render();
  }

  onPress(square: Square): void {
    // The onPress method should delegate to methods like adminMove (the body of which
    // is here) based on game phase and other settings (like admin move "on").
    if (this.selectedPieces.length === 0) {
      // select piece
      this.selectedPieces = square.pieces;

      this.allowableLocations = flatMap(this.selectedPieces, (piece: Piece) =>
        new Pather(this.board, piece, this.rules).findPaths()
      );
    } else {
      if (this.allowableLocations.includes(square.location)) {
        if (this.currentPlayer == this.selectedPieces[0].owner) {
          // move pieces
          this.board.killPiecesAt(square.location);
          this.selectedPieces.forEach((piece) => {
            this.board.displace({ piece, destination: square.location });
          });
          this.rules.forEach((v) => {
            v.postMove?.({ piecesMoved: this.selectedPieces });
          });

          // change turn
          const currentIndex = this.players.indexOf(this.currentPlayer);
          this.currentPlayer = this.players[(currentIndex + 1) % this.players.length];
          this.clock.setActivePlayers([this.currentPlayer]);
        }
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
