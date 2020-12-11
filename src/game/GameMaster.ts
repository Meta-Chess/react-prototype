import { Piece } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, Modal, Move, PieceDelta } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { VariantName, variants } from "./variants";
import { check, CompactRules, fatigue, atomic, Rule } from "./Rules";
import { flatMap } from "lodash";
import {GameClient} from "game/GameClient/GameClient";

export class GameMaster {
  public interrupt: CompactRules;
  public game: Game;
  public gameClones: Game[];
  public selectedPieces: Piece[];
  public allowableMoves: Move[];
  public variant: VariantName;
  public rules: Rule[];
  public modal?: Modal;

  // TODO: Consider restructure to encapsulate visualisation details in a nice abstraction
  public flipBoard: boolean;
  public overTheBoard: boolean;

  // TODO: Consider restructure to encapsulate server details in a nice abstraction
  private gameClient: GameClient | undefined;
  public roomId: string | undefined;
  public online: boolean;

  constructor(gameOptions: GameOptions, private renderer: Renderer) {
    const {
      variant,
      time,
      checkEnabled,
      fatigueEnabled,
      atomicEnabled,
      flipBoard,
      overTheBoard,
      roomId,
      online,
    } = gameOptions;
    const rules = [...variants[variant].rules];
    if (checkEnabled) rules.push(check);
    if (fatigueEnabled) rules.push(fatigue);
    if (atomicEnabled) rules.push(atomic);
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
    this.flipBoard = !!flipBoard;
    this.overTheBoard = !!overTheBoard;

    this.online = !!online;
    if (online) {
      const setRoomId = (roomId: string | undefined) => {
        this.roomId = '"' + roomId + '"';  // TODO: set this after room joining confirmed
      }

      const onMove = (move: Move) => {
        this.game.doMove(move);
        this.render();
      };

      this.gameClient = new GameClient(
        "wss://3oxeo6rv48.execute-api.ap-southeast-2.amazonaws.com/dev", // TODO: Make this an environment variable
          onMove,
          setRoomId,
          roomId
      );
    }
  }

  render(): void {
    this.renderer.render();
  }

  onPress(location: string): void {
    this.hideModal();
    this.gameClones.forEach((clone) => clone.resetTo(this.game));
    const move = this.allowableMoves.find((m) => m.location === location);
    if (move && this.game.currentPlayer === this.selectedPieces[0]?.owner) {
      this.gameClient?.sendMove(move);
      this.game.doMove(move);
      this.unselectAllPieces();
    } else {
      if (this.selectedPieces.some((p) => p.location === location)) {
        // pressing again on a selected piece
        this.unselectAllPieces();
      } else {
        this.unselectAllPieces();
        this.selectPieces(location);
      }
    }
    this.render();
  }

  unselectAllPieces(): void {
    this.selectedPieces = [];
    this.allowableMoves = [];
  }

  selectPieces(location: string): void {
    const square = this.game.board.squareAt(location);
    this.selectedPieces =
      square?.pieces.map((pieceId) => this.game.board.pieces[pieceId]) || [];
    this.allowableMoves = flatMap(this.selectedPieces, (piece: Piece) =>
      new Pather(this.game, this.gameClones, piece, this.interrupt).findPaths()
    );
  }

  setModal(modal: Modal): void {
    this.modal = modal;
    this.render();
  }

  hideModal(): void {
    this.modal = undefined;
    this.render();
  }

  endGame(): void {
    this.gameClient?.close();
  }
}
