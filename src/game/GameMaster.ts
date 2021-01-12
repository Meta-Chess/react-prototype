import { Piece } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, PlayerDisplayNames } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { VariantName, variants } from "./variants/variants";
import { rules as allRules, CompactRules, Rule } from "./Rules";
import { uniqWith } from "lodash";
import { randomChoice } from "utilities";
import { Move, movesAreEqual } from "game/Move";
import { SquareInfo, SquaresInfo } from "game/SquaresInfo";

export class GameMaster {
  public gameClones: Game[];
  public title: string;
  public result: string | undefined;
  public gameOver = false;
  public moveHistory: (Move | undefined)[] = [];

  // TODO: Consider restructure to extract player interaction logic?
  public selectedPieces: Piece[] = [];
  public allowableMoves: Move[] = [];
  public locationSelected = false;
  public squaresInfo = new SquaresInfo();

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
    this.checkGameEndConditions();
  }

  static processConstructorInputs(
    gameOptions: GameOptions,
    renderer: Renderer
  ): [CompactRules, Rule[], VariantName, Game, Renderer, GameOptions] {
    const {
      customRuleNames,
      time,
      checkEnabled,
      fatigueEnabled,
      atomicEnabled,
    } = gameOptions;
    const variant =
      gameOptions.variant || (randomChoice(Object.keys(variants)) as VariantName);

    const ruleNames = !customRuleNames?.length
      ? [...variants[variant].ruleNames]
      : customRuleNames;
    const rules = ruleNames.map((name) => allRules[name]);
    if (checkEnabled) rules.push(allRules.check);
    if (fatigueEnabled && !customRuleNames?.length) rules.push(allRules.fatigue);
    if (atomicEnabled && !customRuleNames?.length) rules.push(allRules.atomic);

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
    this.recalculateSquaresInfo();
    this.renderer.render();
  }

  recalculateSquaresInfo(): void {
    this.squaresInfo.clear();
    this.moveHistory[this.moveHistory.length - 1]?.pieceDeltas.forEach((delta) => {
      this.squaresInfo.add(delta.path.getStart(), SquareInfo.LastMoveStartPoint);
      this.squaresInfo.add(delta.path.getEnd(), SquareInfo.LastMoveEndPoint);
      const path = delta.path.getPath();
      path
        .slice(1, path.length - 1)
        .forEach((pathSquare) =>
          this.squaresInfo.add(pathSquare, SquareInfo.LastMovePath)
        );
    });
    this.selectedPieces.forEach((piece) => {
      if (piece.owner !== this.game.players[this.game.currentPlayerIndex].name) {
        this.squaresInfo.add(piece.location, SquareInfo.SelectedOtherPlayerPiece);
      } else {
        this.squaresInfo.add(piece.location, SquareInfo.SelectedCurrentPlayerPiece);
      }
    });
    this.allowableMoves.forEach((move) => {
      if (move.playerName !== this.game.players[this.game.currentPlayerIndex].name) {
        this.squaresInfo.add(move.location, SquareInfo.PossibleOtherPlayerMoveEndPoint);
      } else if (
        this.interrupt.for.moveIsAggressive({
          move,
          board: this.game.board,
          aggressive: false,
        }).aggressive
      ) {
        this.squaresInfo.add(move.location, SquareInfo.PossibleMoveAggressiveEndPoint);
      } else {
        this.squaresInfo.add(move.location, SquareInfo.PossibleMovePassiveEndPoint);
      }
    });
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
    this.moveHistory.push(move);
    this.game.nextTurn();
    this.checkGameEndConditions();
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
    if (!this.gameOver) this.checkDrawConditions();
  }

  applyLossConditions(): void {
    this.game.alivePlayers().forEach((player) => {
      let { dead } = this.interrupt.for.lethalCondition({
        board: this.game.board,
        player: player.name,
        dead: false,
      });
      if (dead === false) {
        dead = this.interrupt.for.lossCondition({
          playerName: player.name,
          game: this.game,
          gameClones: this.gameClones,
          interrupt: this.interrupt,
          dead: false,
        }).dead;
      }
      player.alive = dead === false;
      if (dead) player.endGameMessage = dead;
    });
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
      this.result = "Draw by mutual destruction!";
      this.endGame();
    } else {
      const draw = this.interrupt.for.drawCondition({
        game: this.game,
        gameClones: this.gameClones,
        interrupt: this.interrupt,
        draw: false,
      }).draw;

      if (draw !== false) {
        this.result = `Draw by ${draw}!`;
        this.endGame();
      }
    }
  }

  endGame(): void {
    this.game.clock?.stop();
    this.gameOver = true;
  }
}
