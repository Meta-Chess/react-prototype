import { Piece } from "./Board";
import { Renderer } from "./Renderer";
import {
  GameOptions,
  Modal,
  Move,
  PlayerName,
  Player,
  PlayerDisplayNames,
} from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { VariantName, variants } from "./variants/variants";
import { check, CompactRules, fatigue, atomic, Rule } from "./Rules";
import { flatMap } from "lodash";
import { winModalContent } from "components/shared/Modals";
import { randomChoice } from "utilities";

export class GameMaster {
  public interrupt: CompactRules;
  public game: Game;
  public gameClones: Game[];
  public selectedPieces: Piece[];
  public allowableMoves: Move[];
  public title: string;
  public variant: VariantName;
  public rules: Rule[];
  public result = ""; // TODO: what is this?
  public modal?: Modal;

  // TODO: Consider restructure to encapsulate visualisation details in a nice abstraction
  public flipBoard: boolean;
  public overTheBoard: boolean;

  constructor(gameOptions: GameOptions, private renderer: Renderer) {
    const {
      customTitle,
      customRules,
      time,
      checkEnabled,
      fatigueEnabled,
      atomicEnabled,
      flipBoard,
      overTheBoard,
    } = gameOptions;
    const variant =
      gameOptions.variant || (randomChoice(Object.keys(variants)) as VariantName);

    const rules = !customRules?.length ? [...variants[variant].rules] : customRules;
    if (checkEnabled && !customRules?.length) rules.push(check);
    if (fatigueEnabled && !customRules?.length) rules.push(fatigue);
    if (atomicEnabled && !customRules?.length) rules.push(atomic);
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
    this.title = customTitle || "Chess"; //TODO bundle this into other info
    this.variant = variant;
    this.rules = rules;
    this.flipBoard = !!flipBoard;
    this.overTheBoard = !!overTheBoard;
  }

  render(): void {
    this.renderer.render();
  }

  handleTimerFinish(): void {
    const clock = this.game.clock;
    if (clock) {
      this.game
        .alivePlayers()
        .filter((p) => {
          const timer = clock.getPlayerTimer(p.name);
          return timer && timer.getAllowance() <= 0;
        })
        .forEach((p) => {
          p.alive = false;
          p.endGameMessage = " ran out of time!";
        });

      const remainingPlayers = clock.getPlayersWithNonzeroAllowance();
      if (remainingPlayers.length == 1) {
        const winner = remainingPlayers[0];
        this.result = PlayerDisplayNames[winner] + " won on time!";
        this.setWon();
        this.endGame();
      }
    }
  }

  onPress(location: string): Move | undefined {
    this.gameClones.forEach((clone) => clone.resetTo(this.game));
    const move = this.allowableMoves.find((m) => m.location === location);
    if (move && this.game.players[this.game.currentPlayerIndex].name === this.selectedPieces[0]?.owner) {
      this.doMove(move);
      if (!this.game.players[this.game.currentPlayerIndex].alive) {
        this.doMove();
      }
      this.render();
      return move;
    } else if (this.selectedPieces.some((p) => p.location === location)) {
      // pressing again on a selected piece
      this.unselectAllPieces();
    } else {
      this.unselectAllPieces();
      this.selectPieces(location);
    }
    this.render();
  }

  doMove(move?: Move): void {
    if (move) {
      this.game.doMove(move);
      this.unselectAllPieces();
    } else {
      this.game.nextTurn();
    }
    this.checkGameEndConditions();
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

  checkGameEndConditions(): void {
    this.applyLossConditions();
    this.checkWinConditions();
    this.checkDrawConditions();
  }

  applyLossConditions(): void {
    this.game.alivePlayers().forEach((p) => {
      const { dead } = this.interrupt.for.lethalCondition({
        board: this.game.board,
        player: p.name,
        dead: false,
      });
      p.alive = !dead;
      if (dead) p.endGameMessage = " slayed on the field of battle";
    });

    //TODO: the same for loss conditions once they exist.
    //TODO: set loss message here by forcing loss conditions to provide one.
  }

  checkWinConditions(): void {
    const remainingPlayers = this.game.alivePlayers();
    if (remainingPlayers.length == 1) {
      this.result = PlayerDisplayNames[remainingPlayers[0].name] + " won";
      this.setWon();
      this.endGame();
    }
    //TODO: once there are other win conditions check those with an interruption point
  }

  checkDrawConditions(): void {
    if (this.game.alivePlayers().length == 0) {
      this.result = "Draw by mutual destruction";
      this.setWon();
      this.endGame();
    }
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
    this.game.clock?.stop();
  }

  setWon(): void {
    this.setModal({
      id: 1,
      fullScreen: true,
      content: winModalContent,
    });
  }
}
