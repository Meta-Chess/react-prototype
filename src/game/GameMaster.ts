import { Piece, Square } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, Move } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { VariantName, variants } from "./variants";
import { Check, CompactRules, Fatigue, Rule } from "./Rules";
import { flatMap } from "lodash";

export class GameMaster {
  public interrupt: CompactRules;
  public game: Game;
  public selectedPieces: Piece[];
  public allowableMoves: Move[];
  public variant: VariantName;
  public rules: Rule[];

  constructor(gameOptions: GameOptions, private renderer: Renderer) {
    const { variant, time, checkEnabled, fatigueEnabled } = gameOptions;
    const rules = [...variants[variant].rules];
    if (checkEnabled) rules.push(Check);
    if (fatigueEnabled) rules.push(Fatigue);
    this.interrupt = new CompactRules(rules);
    this.game = Game.createGame(this.interrupt, time);
    this.selectedPieces = [];
    this.allowableMoves = [];
    this.variant = variant;
    this.rules = rules;
  }

  render(): void {
    this.renderer.render();
  }

  onPress(square: Square): void {
    const move = this.allowableMoves.find((m) => m.location === square.location);
    if (move && this.game.currentPlayer === this.selectedPieces[0]?.owner) {
      this.game.doMove(move);
      this.unselectAllPieces();
    } else {
      if (this.selectedPieces.some((p) => p.location === square.location)) {
        // pressing again on a selected piece
        this.unselectAllPieces();
      } else {
        this.unselectAllPieces();
        this.selectPieces(square);
      }
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
