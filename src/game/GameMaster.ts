import { Piece } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, PlayerDisplayNames } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { VariantName, variants } from "./variants/variants";
import { check, CompactRules, fatigue, atomic, Rule } from "./Rules";
import { uniqWith } from "lodash";
import { randomChoice } from "utilities";
import { Move, movesAreEqual } from "game/Move";

export class GameMaster {
  public gameClones: Game[];
  public title: string;
  public result: string | undefined;
  public gameOver = false;

  // TODO: Consider restructure to extract player interaction logic?
  public selectedPieces: Piece[] = [];
  public allowableMoves: Move[] = [];
  public locationSelected = false;

  // TODO: Consider restructure to encapsulate visualisation details in a nice abstraction
  public flipBoard: boolean;
  public overTheBoard: boolean;

  constructor(
    public interrupt: CompactRules,
    public rules: Rule[],
    public variant: VariantName,
    public game: Game,
    private renderer: Renderer,
    gameOptions?: GameOptions
  ) {
    this.gameClones = [game.clone(), game.clone(), game.clone(), game.clone()];
    this.title = gameOptions?.customTitle || "Chess"; //TODO bundle this into other info
    this.flipBoard = !!gameOptions?.flipBoard;
    this.overTheBoard = !!gameOptions?.overTheBoard;
  }

  static processConstructorInputs(
    gameOptions: GameOptions,
    renderer: Renderer
  ): [CompactRules, Rule[], VariantName, Game, Renderer, GameOptions] {
    const {
      customRules,
      time,
      checkEnabled,
      fatigueEnabled,
      atomicEnabled,
    } = gameOptions;
    const variant =
      gameOptions.variant || (randomChoice(Object.keys(variants)) as VariantName);

    const rules = !customRules?.length ? [...variants[variant].rules] : customRules;
    if (checkEnabled && !customRules?.length) rules.push(check);
    if (fatigueEnabled && !customRules?.length) rules.push(fatigue);
    if (atomicEnabled && !customRules?.length) rules.push(atomic);

    const interrupt = new CompactRules(rules);
    const game = Game.createGame(interrupt, time);
    return [interrupt, rules, variant, game, renderer, gameOptions];
  }

  clone(renderer?: Renderer): GameMaster {
    return new GameMaster(
      this.interrupt,
      this.rules,
      this.variant,
      this.game.clone(),
      renderer || new Renderer(),
      {
        customTitle: this.title,
        flipBoard: this.flipBoard,
        overTheBoard: this.overTheBoard,
      }
    );
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
    const moves = uniqWith(
      this.allowableMoves.filter((m) => m.location === location),
      movesAreEqual
    );
    const isSelectedPieceOwnersTurn =
      this.game.players[this.game.currentPlayerIndex].name ===
      this.selectedPieces[0]?.owner;

    if (moves.length === 1 && isSelectedPieceOwnersTurn) {
      this.doMove(moves[0]);
      if (!this.game.players[this.game.currentPlayerIndex].alive) {
        this.doMove();
      }
      this.render();
      return moves[0];
    } else if (moves.length > 1 && isSelectedPieceOwnersTurn) {
      this.allowableMoves = moves;
      this.locationSelected = true;
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
    this.locationSelected = false;
  }

  selectPieces(location: string): void {
    const square = this.game.board.squareAt(location);
    this.selectedPieces =
      square?.pieces.map((pieceId) => this.game.board.pieces[pieceId]) || [];
    this.allowableMoves = this.selectedPieces.flatMap((piece: Piece) =>
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
