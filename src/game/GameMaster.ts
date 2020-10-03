import { Piece, Square } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, Modal, Move } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { VariantName, variants } from "./variants";
import { Check, CompactRules, Fatigue, Rule } from "./Rules";
import { flatMap } from "lodash";

export class GameMaster {
  public interrupt: CompactRules;
  public game: Game;
  public gameClones: Game[];
  public selectedPieces: Piece[];
  public allowableMoves: Move[];
  public variant: VariantName;
  public rules: Rule[];
  public modal?: Modal;
  public flipBoard: boolean;
  public overTheBoard: boolean;

  constructor(gameOptions: GameOptions, private renderer: Renderer) {
    const {
      variant,
      time,
      checkEnabled,
      fatigueEnabled,
      flipBoard,
      overTheBoard,
    } = gameOptions;
    const rules = [...variants[variant].rules];
    if (checkEnabled) rules.push(Check);
    if (fatigueEnabled) rules.push(Fatigue);
    this.interrupt = new CompactRules(rules);
    this.game = Game.createGame(this.interrupt, time);
    this.gameClones = [
      this.game.clone(),
      this.game.clone(),
      this.game.clone(),
      this.game.clone(),
    ];
    this.selectedPieces = [];
    this.allowableMoves = [];
    this.variant = variant;
    this.rules = rules;
    this.flipBoard = flipBoard;
    this.overTheBoard = overTheBoard;
  }

  render(): void {
    this.renderer.render();
  }

  onPress(square: Square): void {
    this.hideModal();
    this.gameClones.forEach((clone) => clone.resetTo(this.game));
    const move = this.allowableMoves.find((m) => m.location === square.location);
    if (move && this.game.currentPlayer === this.selectedPieces[0]?.owner) {
      this.game.doMove(move);
      this.unselectAllgetPieces();
    } else {
      if (this.selectedPieces.some((p) => p.location === square.location)) {
        // pressing again on a selected piece
        this.unselectAllgetPieces();
      } else {
        this.unselectAllgetPieces();
        this.selectPieces(square);
      }
    }
    this.render();
  }

  unselectAllgetPieces(): void {
    this.selectedPieces = [];
    this.allowableMoves = [];
  }

  selectPieces(square: Square): void {
    this.selectedPieces = square.pieces.map((pId) => this.game.board.pieces[pId]);
    this.allowableMoves = flatMap(this.selectedPieces, (piece: Piece) =>
      new Pather(this.game, this.gameClones, piece, this.interrupt).findPaths()
    );
  }

  setModal(modal: Modal): void {
    this.modal?.onHide();
    this.modal = modal;
    this.modal?.onShow();
    this.render();
  }

  hideModal(): void {
    this.modal?.onHide();
    this.modal = undefined;
    this.render();
  }
}
