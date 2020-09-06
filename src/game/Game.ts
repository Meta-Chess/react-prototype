import { Board, Piece, Square } from "./Board";
import { Renderer } from "./Renderer";
import { Clock } from "./Clock";
import { GameOptions, Move, Player } from "./types";
import { Pather } from "./Pather";
import { flatMap } from "lodash";
import { variants } from "./variants";
import { CompactRules } from "./Rules/Rules";

export class Game {
  public clock: Clock | undefined;
  public players: Player[];
  public selectedPieces: Piece[];
  public allowableMoves: Move[];
  public currentPlayer: Player;
  public currentTurn: number;

  constructor(
    public board: Board,
    public interrupt: CompactRules,
    public format: Format,
    public renderer: Renderer,
    time: number | undefined
  ) {
    this.clock = time ? new Clock([Player.White, Player.Black], time) : undefined;
    this.clock?.setActivePlayers([Player.White]);
    this.players = [Player.White, Player.Black];
    this.currentPlayer = Player.White;
    this.currentTurn = 1;
    this.selectedPieces = [];
    this.allowableMoves = [];
  }

  static createGame(input: { gameOptions: GameOptions; renderer: Renderer }): Game {
    const { variant, time } = input.gameOptions;
    const interrupt = new CompactRules(variants[variant].rules);
    return new Game(
      Board.createBoard(interrupt),
      interrupt,
      Format.default,
      input.renderer,
      time
    );
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
      new Pather(this.board, piece, this.interrupt).findPaths()
    );
  }
  unselectAllPieces(): void {
    this.selectedPieces = [];
    this.allowableMoves = [];
  }

  doMove(move?: Move): void {
    if (!move) return;

    this.board.displacePieces(move.pieceDeltas);

    this.interrupt.for.postMove({ move });

    this.nextTurn();
  }

  nextTurn(): void {
    const currentIndex = this.players.indexOf(this.currentPlayer);
    this.currentPlayer = this.players[(currentIndex + 1) % this.players.length];
    this.clock?.setActivePlayers([this.currentPlayer]);
  }
}

enum Format {
  default,
}
