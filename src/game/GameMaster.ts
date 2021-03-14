import { Piece } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, PlayerAssignment, PlayerName, VariantLabelInfo } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { CompactRules, RuleName } from "./rules";
import { FutureVariantName } from "./variants";
import { uniqWith, uniq } from "lodash";
import { Move, movesAreEqual } from "game/Move";
import { SquareInfo, SquaresInfo } from "game/SquaresInfo";
import { FormatName } from "game/formats";
import { doesCapture } from "./rules/utilities";
import { Resign } from "./PlayerAction";

export class GameMaster {
  // WARNING: Default values exist both here and in `GameMaster.resetToStartOfGame`
  public gameClones: Game[];
  public result: string | undefined;
  public gameOver = false;
  public moveHistory: (Move | undefined)[] = [];
  public positionInHistory = 0;
  public formatVariants: FutureVariantName[] = [];
  public formatVariantLabelColors: {
    [formatVariantsIndex: number]: VariantLabelInfo;
  } = {};
  public deck: FutureVariantName[] | undefined;

  // TODO: Consider restructure to extract player interaction logic?
  public selectedPieces: Piece[] = [];
  public allowableMoves: Move[] = [];
  public locationSelected = false;
  public squaresInfo = new SquaresInfo();
  public timersAsOf?: number = undefined;

  // TODO: Consider restructure to encapsulate visualisation details in a nice abstraction
  public flipBoard: boolean;
  public overTheBoard: boolean;

  constructor(
    public game: Game,
    public interrupt: CompactRules, // This should probably be private
    public gameOptions: GameOptions,
    public assignedPlayer: PlayerAssignment = "all",
    protected renderer?: Renderer,
    protected evaluateEndGameConditions = true
  ) {
    this.gameClones = [game.clone(), game.clone(), game.clone(), game.clone()];

    // TODO: These can be taken from gameOptions? maybe?
    this.flipBoard = !!gameOptions?.flipBoard;
    this.overTheBoard = !!gameOptions?.overTheBoard;
    this.deck = gameOptions?.deck;

    this.startOfTurn();
  }

  // TODO: put defaults in just one place
  resetToStartOfGame(): void {
    this.gameOver = false;
    this.positionInHistory = 0;
    this.formatVariants = [];
    this.formatVariantLabelColors = {};
    this.selectedPieces = [];
    this.allowableMoves = [];
    this.locationSelected = false;
    this.squaresInfo = new SquaresInfo();
    this.timersAsOf = undefined;
    const [game, interrupt] = GameMaster.processConstructorInputs({
      gameOptions: this.gameOptions,
      assignedPlayer: this.assignedPlayer,
      renderer: this.renderer,
    });
    this.game = game;
    this.interrupt = interrupt;
  }

  static processConstructorInputs({
    gameOptions = {},
    assignedPlayer = "all",
    renderer,
  }: {
    gameOptions?: Partial<GameOptions>;
    assignedPlayer?: PlayerAssignment;
    renderer?: Renderer;
  } = {}): ConstructorParameters<typeof GameMaster> {
    const {
      time,
      checkEnabled,
      format = "variantComposition",
      baseVariants = [],
      numberOfPlayers = 2,
    } = gameOptions;

    const completeGameOptions: GameOptions = {
      ...gameOptions,
      format,
      baseVariants,
      numberOfPlayers,
    };

    const interrupt = new CompactRules(
      baseVariants,
      [format],
      checkEnabled ? ["check"] : []
    );
    const game = interrupt.for.afterGameCreation({
      game: Game.createGame(interrupt, time, numberOfPlayers),
    }).game;

    return [game, interrupt, completeGameOptions, assignedPlayer, renderer];
  }

  clone({
    renderer,
    evaluateEndGameConditions = true,
  }: {
    renderer?: Renderer;
    evaluateEndGameConditions?: boolean;
  }): GameMaster {
    return new GameMaster(
      this.game.clone(),
      this.interrupt,
      this.gameOptions,
      this.assignedPlayer,
      renderer || new Renderer(),
      evaluateEndGameConditions
    );
  }

  render(): void {
    this.recalculateSquaresInfo();
    this.renderer?.render();
  }

  setActiveVariants(variants: FutureVariantName[]): void {
    this.formatVariants = variants;
    this.recalculateRules();
  }

  recalculateRules(): void {
    this.interrupt.constructor(
      [...this.formatVariants, ...(this.gameOptions.baseVariants || [])],
      this.gameOptions.format ? [this.gameOptions.format] : [],
      this.gameOptions.checkEnabled ? ["check"] : []
    );
    this.game.setInterrupt(this.interrupt);
  }

  recalculateSquaresInfo(): void {
    this.squaresInfo.clear();
    this.moveHistory[this.positionInHistory - 1]?.pieceDeltas.forEach((delta) => {
      this.squaresInfo.add(delta.path.getStart(), SquareInfo.LastMoveStartPoint);
      this.squaresInfo.add(delta.path.getEnd(), SquareInfo.LastMoveEndPoint);
      const path = delta.path.getPath();
      path
        .slice(1, path.length - 1)
        .forEach((pathSquare) =>
          this.squaresInfo.add(pathSquare, SquareInfo.LastMovePath)
        );
    });
    const currentPlayerName = this.game.players[this.game.currentPlayerIndex].name;
    this.selectedPieces.forEach((piece) => {
      if (
        piece.owner !== currentPlayerName ||
        (this.assignedPlayer !== "all" && this.assignedPlayer !== piece.owner) ||
        this.positionInHistory !== this.moveHistory.length
      ) {
        this.squaresInfo.add(piece.location, SquareInfo.SelectedOtherPlayerPiece);
      } else {
        this.squaresInfo.add(piece.location, SquareInfo.SelectedCurrentPlayerPiece);
      }
    });
    this.allowableMoves.forEach((move) => {
      if (
        move.playerName !== currentPlayerName ||
        (this.assignedPlayer !== "all" && this.assignedPlayer !== currentPlayerName) ||
        this.positionInHistory !== this.moveHistory.length
      ) {
        this.squaresInfo.add(move.location, SquareInfo.PossibleOtherPlayerMoveEndPoint);
      } else if (!doesCapture(move)) {
        this.squaresInfo.add(move.location, SquareInfo.PossibleMovePassiveEndPoint);
      } else {
        this.squaresInfo.add(move.location, SquareInfo.PossibleMoveAggressiveEndPoint);
      }
    });
  }

  handlePossibleTimerFinish(): void {
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
          if (player.name === this.game.getCurrentPlayerName()) this.doMove();
        });
    }
  }

  filterAllowableMoves(filter: (move: Move) => boolean): Move | undefined {
    this.allowableMoves = this.allowableMoves.filter(filter);
    if (this.allowableMoves.length === 1) {
      const move = this.allowableMoves[0];
      this.doMove({ move });
      return move;
    }
  }

  setPositionInHistory(newPosition: number): void {
    if (newPosition > this.moveHistory.length) newPosition = this.moveHistory.length;
    else if (newPosition < 0) newPosition = 0;
    // console.log(this.moveHistory, this.positionInHistory);

    if (newPosition < this.positionInHistory) {
      // TODO: make this more readable
      const moveHistory = this.moveHistory;
      this.resetToStartOfGame();
      this.moveHistory = moveHistory;
    }
    // console.log(this.moveHistory, this.positionInHistory);
    while (newPosition > this.positionInHistory) {
      const nextMove = this.moveHistory[this.positionInHistory];
      this.doMove({ move: nextMove, fromHistory: true });
    }
    // console.log(this.moveHistory, this.positionInHistory);
    this.render();
  }

  onPress(location: string, pieceId?: string): Move | undefined {
    // console.log(`${this.selectedPieces.length ? "" : "\n\n// Move ... ???\n"}gameMaster.onPress("${location}");`); // TEST WRITING HELPER COMMENT
    const moves = uniqWith(
      this.allowableMoves.filter((m) => m.location === location),
      movesAreEqual
    );
    const isSelectedPieceOwnersTurn =
      this.game.players[this.game.currentPlayerIndex].name ===
      this.selectedPieces[0]?.owner;
    const canMoveSelectedPiece =
      isSelectedPieceOwnersTurn &&
      this.positionInHistory === this.moveHistory.length &&
      (this.assignedPlayer === "all" ||
        this.assignedPlayer === this.selectedPieces[0]?.owner);

    if (moves.length === 1 && canMoveSelectedPiece) {
      this.doMove({ move: moves[0] });
      if (!this.game.players[this.game.currentPlayerIndex].alive) {
        this.doMove();
      }
      this.render();
      return moves[0];
    } else if (moves.length > 1 && canMoveSelectedPiece) {
      this.allowableMoves = moves;
      this.locationSelected = true;
    } else if (
      (pieceId && this.selectedPieces.some((p) => p.id === pieceId)) ||
      (!pieceId && this.selectedPieces.some((p) => p.location === location))
    ) {
      // pressing again on a selected piece
      this.unselectPieces(
        pieceId ? [pieceId] : this.game.board.squareAt(location)?.pieces
      );
    } else {
      this.unselectAllPieces();
      pieceId !== undefined ? this.selectPiece(pieceId) : this.selectPieces(location);
    }
    this.render();
  }

  doMove({
    move,
    unselect = true,
    fromHistory = false,
  }: { move?: Move; unselect?: boolean; fromHistory?: boolean } = {}): void {
    // if (move) console.log(`expect(board.getPiecesAt("${move.location}").length).toEqual(1);`); // TEST WRITING HELPER COMMENT
    if (move) {
      this.game.doMove(move);
      if (unselect) this.unselectAllPieces();
    }
    if (!fromHistory && move) this.moveHistory.push(move);
    if (move) this.positionInHistory += 1;
    const everyoneHasMoved =
      uniq(this.moveHistory.map((m) => m?.playerName)).length ===
      this.game.players.length;
    this.game.nextTurn({
      asOf: move?.timestamp || Date.now(),
      startClocks: everyoneHasMoved,
    });
    this.startOfTurn();
  }

  doResign(resign: Resign): void {
    const player = this.game
      .getPlayers()
      .find((p): boolean => p.name === resign.playerName);
    if (player) {
      player.alive = false;
      player.endGameMessage = "resigned";
      if (this.game.getCurrentPlayerName() === player.name) {
        this.doMove();
        return;
      }
      if (this.game.alivePlayers().length < 2) this.checkGameEndConditions();
      this.render();
    }
  }

  startOfTurn(): void {
    this.interrupt.for.formatControlAtTurnStart({ gameMaster: this });
    if (this.game.getCurrentPlayer().alive || this.game.alivePlayers().length === 0) {
      this.checkGameEndConditions();
      this.render(); // TODO: avoid excess renders when pressing back button
    } else {
      this.doMove();
    }
  }

  unselectAllPieces(): void {
    this.selectedPieces = [];
    this.allowableMoves = [];
    this.locationSelected = false;
  }

  unselectPieces(pieceIds?: string[]): void {
    this.selectedPieces = this.selectedPieces.filter((p) => !pieceIds?.includes(p.id));
    this.allowableMoves = [];
    this.calculateAllowableMovesForSelectedPieces();
  }

  selectPieces(location: string): void {
    const square = this.game.board.squareAt(location);
    this.selectedPieces =
      square?.pieces.map((pieceId) => this.game.board.pieces[pieceId]) || [];
    this.calculateAllowableMovesForSelectedPieces();
  }

  calculateAllowableMovesForSelectedPieces(): void {
    this.locationSelected = false;
    this.allowableMoves = this.selectedPieces.flatMap((piece: Piece) =>
      new Pather(this.game, this.gameClones, piece, this.interrupt).findPaths()
    );
    // console.log(`// Expect allowable moves to be ... ??? \n expect(gameMaster.allowableMoves).toEqual(expect.arrayContaining([${this.allowableMoves.map((move) => `expect.objectContaining({ location: "${move.location}"})`)}])); \n expect(gameMaster.allowableMoves.length).toEqual(${this.allowableMoves.length});`); // TEST WRITING HELPER COMMENT
  }

  selectPiece(pieceId: string): void {
    this.selectedPieces = [this.game.board.pieces[pieceId]];
    this.allowableMoves = new Pather(
      this.game,
      this.gameClones,
      this.selectedPieces[0],
      this.interrupt
    ).findPaths();
  }

  checkGameEndConditions(): void {
    if (!this.evaluateEndGameConditions) return;
    this.applyLossConditions();
    if (
      !this.gameOver &&
      !this.game.players[this.game.currentPlayerIndex].alive &&
      this.game.alivePlayers().length > 1
    ) {
      this.doMove();
      return;
    }
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
      this.result = PlayerName[remainingPlayers[0].name] + " won!";
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
    this.game.clock?.stop(Date.now());
    this.gameOver = true;
  }

  getRuleNames(): RuleName[] {
    return this.interrupt.getRuleNames();
  }

  getVariantNames(): FutureVariantName[] {
    return [...(this.gameOptions.baseVariants || []), ...(this.formatVariants || [])];
  }

  getFormatName(): FormatName {
    return this.gameOptions.format;
  }
}
