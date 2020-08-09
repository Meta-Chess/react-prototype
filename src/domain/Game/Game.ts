import { Board } from "./Board";
import { Renderer } from "./Renderer";
import { Clock } from "./Clock";
import { Player, Variant } from "./types";
import { Square, Piece } from "./Board";
import { Pather } from "./Pather";
import { PawnDoubleStep } from "./Variants";
import { flatMap } from "lodash";

export class Game {
  public clock: Clock;
  public players: Player[];
  public selectedPieces: Piece[];
  public allowableLocations: string[];

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
  }

  static createEmptyGame(renderer: Renderer): Game {
    return new Game(Board.createEmptyBoard(), [], Format.default, renderer);
  }

  static createBasicGame(renderer: Renderer): Game {
    return new Game(Board.createBasicBoard(), [], Format.default, renderer);
  }

  static createStandardGame(renderer: Renderer): Game {
    return new Game(
      Board.createStandardBoard(),
      [PawnDoubleStep],
      Format.default,
      renderer
    );
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
        new Pather(this.board, piece).findPaths()
      );
    } else {
      if (this.allowableLocations.includes(square.location)) {
        // move pieces
        this.board.killPiecesAt(square.location);
        this.selectedPieces.forEach((piece) => {
          this.board.displace({ piece, destination: square.location });
          // if (piece.type === PieceType.Pawn) piece.attributes.doubleStep = false; //TODO: Move into some post move event
        });
        this.variants.forEach((v) => {
          v.postMove?.({ piecesMoved: this.selectedPieces });
        });
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
