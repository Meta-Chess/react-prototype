import { Piece } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, Move, PlayerDisplayNames } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { VariantName, variants } from "./variants/variants";
import { check, CompactRules, fatigue, atomic, Rule } from "./Rules";
import { flatMap } from "lodash";
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
  public result: string | undefined;
  public gameOver: boolean;

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
    this.gameOver = false;
  }

  render(): void {
    this.renderer.render();
  }

  handleTimerFinish(): void {
    const clock = this.game.clock;
    if (clock) {
      this.game
        .alivePlayers()
        .filter((player) => {
          const timer = clock.getPlayerTimer(player.name);
          return timer && timer.getAllowance() <= 0;
        })
        .forEach((player) => {
          player.alive = false;
          player.endGameMessage = "ran out of time";
        });

      this.doMove();
    }
  }

  onPress(location: string): Move | undefined {
    this.gameClones.forEach((clone) => clone.resetTo(this.game));
    const move = this.allowableMoves.find((m) => m.location === location);
    if (
      move &&
      this.game.players[this.game.currentPlayerIndex].name ===
        this.selectedPieces[0]?.owner
    ) {
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

  doMove(move?: Move, unselect = true): void {
    if (move) {
      this.game.doMove(move);
      if (unselect) this.unselectAllPieces();
    }
    this.checkGameEndConditions();
    this.game.nextTurn();
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

  checkGameEndConditions(): void {
    this.applyLossConditions();
    this.checkWinConditions();
    this.checkDrawConditions();
  }

  applyLossConditions(): void {
    this.game.alivePlayers().forEach((player) => {
      const { dead } = this.interrupt.for.lethalCondition({
        board: this.game.board,
        player: player.name,
        dead: false,
      });
      player.alive = !dead;
      if (dead) player.endGameMessage = "slayed on the field of battle";
    });

    //TODO: the same for loss conditions once they exist.
    //TODO: set loss message here by forcing loss conditions to provide one.
  }

  checkWinConditions(): void {
    const remainingPlayers = this.game.alivePlayers();
    if (remainingPlayers.length === 1) {
      this.result = PlayerDisplayNames[remainingPlayers[0].name] + " won!";
      this.endGame();
    }
    //TODO: once there are other win conditions check those with an interruption point
  }

  checkDrawConditions(): void {
    if (this.game.alivePlayers().length == 0) {
      this.result = "Draw by mutual destruction";
      this.endGame();
    }
  }

  endGame(): void {
    this.game.clock?.stop();
    this.gameOver = true;
  }
}
