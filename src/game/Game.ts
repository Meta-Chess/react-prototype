import { Board, Piece, Square } from "./Board";
import { Renderer } from "./Renderer";
import { Clock } from "./Clock";
import { Move, Player, Rule } from "./types";
import { Pather } from "./Pather";
import { flatMap } from "lodash";
import { VariantName, variants } from "game/variants";

export class Game {
  public clock: Clock;
  public players: Player[];
  public selectedPieces: Piece[];
  public allowableMoves: Move[];
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
    this.allowableMoves = [];
  }

  static createGame(input: { variant: VariantName; renderer: Renderer }): Game {
    const rules = variants[input.variant].rules;
    return new Game(Board.createBoard(rules), rules, Format.default, input.renderer);
  }

  render(): void {
    this.renderer.render();
  }

  onPress(square: Square): void {
    if (this.selectedPieces.length === 0) {
      this.selectPieces(square);
    } else {
      if (this.currentPlayer == this.selectedPieces[0].owner) {
        this.doMove(this.allowableMoves.find((m) => m.location === square.location));
      }
      this.unselectAllPieces();
    }
    this.render();
  }

  selectPieces(square: Square): void {
    this.selectedPieces = square.pieces;
    this.allowableMoves = flatMap(this.selectedPieces, (piece: Piece) =>
      new Pather(this.board, piece, this.rules).findPaths()
    );
  }
  unselectAllPieces(): void {
    this.selectedPieces = [];
    this.allowableMoves = [];
  }

  doMove(move?: Move): void {
    if (!move) return;

    this.board.displacePieces(move.pieceDeltas);

    this.rules.forEach((v) => {
      v.postMove?.({ piecesMoved: this.selectedPieces });
    });

    this.nextTurn();
  }

  nextTurn(): void {
    const currentIndex = this.players.indexOf(this.currentPlayer);
    this.currentPlayer = this.players[(currentIndex + 1) % this.players.length];
    this.clock.setActivePlayers([this.currentPlayer]);
  }
}

enum Format {
  default,
}
