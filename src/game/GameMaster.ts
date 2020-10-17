import { Piece, Square } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, Modal, Move } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { VariantName, variants } from "./variants";
import { Check, CompactRules, Fatigue, Atomic, Rule } from "./Rules";
import { flatMap } from "lodash";
import socketIOClient from "socket.io-client";

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
  private socket: SocketIOClient.Socket | undefined;
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
    if (checkEnabled) rules.push(Check);
    if (fatigueEnabled) rules.push(Fatigue);
    if (atomicEnabled) rules.push(Atomic);
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

    this.online = online;
    if (online) {
      this.socket = socketIOClient("http://localhost:8000"); // TODO: Make this an environment variable
      this.socket.on("roomId", (roomId: string): void => {
        this.roomId = roomId;
        this.render();
      });
      this.socket.on("move", (move: Move) => {
        this.game.doMove(move);
        this.render();
      });
      this.socket.emit("joinRoom", { roomId });
    }
  }

  render(): void {
    this.renderer.render();
  }

  onPress(square: Square): void {
    this.hideModal();
    this.gameClones.forEach((clone) => clone.resetTo(this.game));
    const move = this.allowableMoves.find((m) => m.location === square.location);
    if (move && this.game.currentPlayer === this.selectedPieces[0]?.owner) {
      this.socket?.emit("move", { move, roomId: this.roomId });
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
    this.selectedPieces = square.pieces.map((pId) => this.game.board.pieces[pId]);
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
    this.socket?.disconnect();
  }
}
