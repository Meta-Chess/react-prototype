import { Piece, Square } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, Move } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { variants } from "./variants";
import { CompactRules } from "./Rules";
import { flatMap } from "lodash";

export class GameMaster {
  public interrupt: CompactRules;
  public game: Game;
  public selectedPieces: Piece[];
  public allowableMoves: Move[];

  constructor(gameOptions: GameOptions, private renderer: Renderer) {
    const { variant, time } = gameOptions;
    this.interrupt = new CompactRules(variants[variant].rules);
    this.game = Game.createGame(this.interrupt, time);
    this.selectedPieces = [];
    this.allowableMoves = [];
  }

  render(): void {
    this.renderer.render();
  }

  onPress(square: Square): void {
    if (this.selectedPieces.length === 0) {
      this.selectPieces(square);
    } else {
      if (this.game.currentPlayer == this.selectedPieces[0].owner) {
        this.game.doMove(this.allowableMoves.find((m) => m.location === square.location));
      }
      this.unselectAllPieces();
    }
    this.render();
  }

  unselectAllPieces(): void {
    this.selectedPieces = [];
    this.allowableMoves = [];
  }

  selectPieces(square: Square): void {
    this.selectedPieces = square.pieces;
    this.allowableMoves = flatMap(this.selectedPieces, (piece: Piece) =>
      new Pather(this.game, piece, this.interrupt).findPaths()
    );
  }
}