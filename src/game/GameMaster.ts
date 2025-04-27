import { Piece } from "./Board";
import { Renderer } from "./Renderer";
import { GameOptions, PlayerName, TimestampMillis, VariantLabelInfo } from "./types";
import { Pather } from "./Pather";
import { Game } from "./Game";
import { CompactRules, RuleName } from "./CompactRules";
import { FutureVariantName } from "./variants";
import { cloneDeep, uniq, uniqWith } from "lodash";
import { Move, movesAreEqual } from "game/Move";
import { SquareInfo, SquaresInfo } from "game/SquaresInfo";
import { FormatName } from "game/formats";
import { doesCapture } from "./CompactRules/utilities";
import { Draw, PlayerAction, Resignation } from "./PlayerAction";
import { doAsync, isPresent, sleep } from "utilities";
import autoBind from "auto-bind";
import { PlayerActionCommunicator } from "./automaticPlay/PlayerAgent";

export class GameMaster implements PlayerActionCommunicator {
  // WARNING: Default values exist both here and in `GameMaster.resetToStartOfGame`
  public gameClones: Game[];
  public result: string | undefined;
  public drawOffers: { [playerName in PlayerName]?: boolean } = {};
  public gameOver = false;
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
  public loadingSquares: string[] = [];
  public timersAsOf?: number = undefined;

  // TODO: Consider restructure to encapsulate visualisation details in a nice abstraction
  public flipBoard: boolean;
  public overTheBoard: boolean;

  protected onPlayerAction: ((playerAction: PlayerAction) => void) | undefined;

  constructor(
    public game: Game,
    public interrupt: CompactRules, // This should probably be private
    public gameOptions: GameOptions,
    public assignedPlayers: PlayerName[],
    protected renderer?: Renderer,
    public playerActionHistory: PlayerAction[] = [],
    protected evaluateEndGameConditions = true,
    public positionInHistory = 0
  ) {
    autoBind(this);
    this.gameClones = evaluateEndGameConditions
      ? [game.clone(), game.clone(), game.clone(), game.clone()]
      : [game.clone(), game.clone()];

    this.drawOffers = game.players.reduce(
      (acc: { [n in PlayerName]?: boolean }, p) => ({ ...acc, [p.name]: false }),
      {}
    );

    this.flipBoard = !!gameOptions?.flipBoard;
    this.overTheBoard = !!gameOptions?.overTheBoard;
    this.deck = gameOptions?.deck;

    this.setPositionInHistory(this.playerActionHistory.length);
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
    const [game, interrupt, { deck }] = GameMaster.processConstructorInputs({
      gameOptions: this.gameOptions,
      assignedPlayers: this.assignedPlayers,
      renderer: this.renderer,
    });
    this.deck = deck;
    this.game = game;
    this.interrupt = interrupt;
    this.loadingSquares = [];
    this.startOfTurn();
  }

  static processConstructorInputs({
    gameOptions,
    assignedPlayers = gameOptions.players, // i.e. all players
    renderer,
    playerActionHistory = [],
  }: {
    gameOptions: GameOptions;
    assignedPlayers?: PlayerName[];
    renderer?: Renderer;
    playerActionHistory?: PlayerAction[];
  }): ConstructorParameters<typeof GameMaster> {
    const interrupt = new CompactRules(
      gameOptions.baseVariants,
      [gameOptions.format],
      gameOptions.checkEnabled ? ["check"] : [],
      gameOptions.ruleNamesWithParams
    );
    const game = interrupt.for.afterGameCreation({
      game: Game.createGame(interrupt, gameOptions.time, gameOptions.numberOfPlayers),
    }).game;

    return [game, interrupt, gameOptions, assignedPlayers, renderer, playerActionHistory];
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
      this.interrupt.clone(),
      cloneDeep(this.gameOptions),
      this.assignedPlayers,
      renderer || new Renderer(),
      cloneDeep(this.playerActionHistory),
      evaluateEndGameConditions,
      this.positionInHistory
    );
  }

  render(): void {
    this.recalculateSquaresInfo();
    this.renderer?.render();
  }

  setSendPlayerAction(sendPlayerAction: (playerAction: PlayerAction) => void): void {
    this.onPlayerAction = sendPlayerAction;
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

  // TODO: Break into multiple functions
  recalculateSquaresInfo(): void {
    this.squaresInfo.clear();
    const lastInterestingMoveIndex = this.lastInterestingMoveIndex({ strict: true });
    if (lastInterestingMoveIndex !== undefined) {
      const lastInterestingMove = this.playerActionHistory[lastInterestingMoveIndex];
      if (lastInterestingMove && lastInterestingMove.type === "move") {
        lastInterestingMove.data?.pieceDeltas.forEach((delta) => {
          this.squaresInfo.add(delta.path.getStart(), SquareInfo.LastMoveStartPoint);
          this.squaresInfo.add(delta.path.getEnd(), SquareInfo.LastMoveEndPoint);
          const path = delta.path.getPath();
          path
            .slice(1, path.length - 1)
            .forEach((pathSquare) =>
              this.squaresInfo.add(pathSquare, SquareInfo.LastMovePath)
            );
        });
      }
    }
    const currentPlayerName = this.game.players[this.game.getCurrentPlayerIndex()].name;
    this.selectedPieces.forEach((piece) => {
      if (
        piece.owner !== currentPlayerName ||
        !this.assignedPlayers.includes(piece.owner) ||
        this.positionInHistory !== this.playerActionHistory.length
      ) {
        this.squaresInfo.add(piece.location, SquareInfo.SelectedOtherPlayerPiece);
      } else {
        this.squaresInfo.add(piece.location, SquareInfo.SelectedCurrentPlayerPiece);
      }
    });
    this.allowableMoves.forEach((move) => {
      if (
        move.playerName !== currentPlayerName ||
        !this.assignedPlayers.includes(currentPlayerName) ||
        this.positionInHistory !== this.playerActionHistory.length
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
          return timer && timer.getTimeRemaining() <= 0;
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
      this.doPlayerAction({ playerAction: { type: "move", data: move } });
      return move;
    }
    this.render();
  }

  async setPositionInHistoryToLatest(): Promise<void> {
    while (!this.stateIsCurrent()) {
      this.render();
      await sleep(50);
      this.goForwardsInHistory();
    }
    this.render();
  }

  stateIsCurrent(): boolean {
    return this.positionInHistory === this.playerActionHistory.length;
  }

  goForwardsInHistory(): void {
    const nextInterestingIndex = this.nextInterestingMoveIndex();
    if (nextInterestingIndex !== undefined)
      this.setPositionInHistory(nextInterestingIndex);
  }

  goBackwardsInHistory(): void {
    const lastInterestingIndex = this.lastInterestingMoveIndex();
    if (lastInterestingIndex !== undefined)
      this.setPositionInHistory(lastInterestingIndex);
  }

  nextInterestingMoveIndex(): number {
    if (this.stateIsCurrent()) return this.positionInHistory;
    let indexToReturn = this.positionInHistory + 1;
    while (
      !this.isInteresting(this.playerActionHistory[indexToReturn]) &&
      indexToReturn < this.playerActionHistory.length
    ) {
      indexToReturn++;
    }
    return indexToReturn;
  }

  lastInterestingMoveIndex({ strict = false }: { strict?: boolean } = {}):
    | number
    | undefined {
    if (this.positionInHistory === 0) return strict ? undefined : this.positionInHistory;
    let indexToReturn = this.positionInHistory - 1;
    while (
      !this.isInteresting(this.playerActionHistory[indexToReturn]) &&
      indexToReturn > 0
    ) {
      indexToReturn--;
    }
    return indexToReturn;
  }

  isInteresting(playerAction?: PlayerAction): boolean {
    return !!playerAction && playerAction.type === "move" && !!playerAction.data;
  }

  setPositionInHistory(newPosition: number): void {
    if (newPosition > this.playerActionHistory.length)
      newPosition = this.playerActionHistory.length;
    else if (newPosition < 0) newPosition = 0;

    if (newPosition < this.positionInHistory) {
      const moveHistory = this.playerActionHistory;
      this.resetToStartOfGame();
      this.playerActionHistory = moveHistory;
    }
    while (newPosition > this.positionInHistory) {
      const nextPlayerAction = this.playerActionHistory[this.positionInHistory];
      if (nextPlayerAction) this.doPlayerAction({ playerAction: nextPlayerAction });
    }

    if (this.stateIsCurrent()) {
      this.timersAsOf = undefined;
    } else {
      const timersAsOfMoveIndex =
        this.positionInHistory === 0 ? 0 : this.positionInHistory - 1;
      this.timersAsOf = this.playerActionHistory[timersAsOfMoveIndex]?.timestamp;
    }

    this.render();
  }

  async onSquarePress(location: string, pieceId?: string): Promise<void> {
    this.loadingSquares.push(location);
    const delayedRender = setTimeout(this.render, 50);
    await doAsync(this.handleSquarePressed)(location, pieceId);
    clearTimeout(delayedRender);
    this.loadingSquares = this.loadingSquares.filter((l) => l != location);
    this.render();
  }

  handleSquarePressed(location: string, pieceId?: string): Move | undefined {
    // console.log(`${this.selectedPieces.length ? "" : "\n\n// Move ... ???\n"}gameMaster.handleSquarePressed("${location}");`); // TEST WRITING HELPER COMMENT
    const moves = uniqWith(
      this.allowableMoves.filter((m) => m.location === location),
      movesAreEqual
    );
    const isSelectedPieceOwnersTurn =
      this.game.players[this.game.getCurrentPlayerIndex()].name ===
      this.selectedPieces[0]?.owner;
    const canMoveSelectedPiece =
      isSelectedPieceOwnersTurn &&
      this.stateIsCurrent() &&
      this.assignedPlayers.includes(this.selectedPieces[0]?.owner);

    if (moves.length === 1 && canMoveSelectedPiece) {
      this.doPlayerAction({
        playerAction: { type: "move", data: moves[0] },
      });
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
  }

  receivePlayerAction(playerAction: PlayerAction): void {
    return this.doPlayerAction({ playerAction, receivedFromBroadcaster: true });
  }

  doPlayerAction({
    playerAction,
    unselect = true,
    receivedFromBroadcaster: received = false,
  }: {
    playerAction: PlayerAction;
    unselect?: boolean;
    receivedFromBroadcaster?: boolean;
  }): void {
    if (playerAction?.type === "move") {
      this.doMove({
        move: playerAction.data,
        timestamp: playerAction.timestamp,
        unselect,
      });
    } else if (playerAction?.type === "resign") {
      this.doResign({
        resignation: playerAction.data,
        timestamp: playerAction.timestamp,
      });
    }
    this.calculateAllowableMovesForSelectedPieces();
    this.render();
    if (!received) this.onPlayerAction?.(playerAction);
  }

  doMove({
    move,
    timestamp,
    unselect = true,
  }: { move?: Move; timestamp?: TimestampMillis; unselect?: boolean } = {}): void {
    // if (move) console.log(`expect(board.getPiecesAt("${move.location}").length).toEqual(1);`); // TEST WRITING HELPER COMMENT
    if (move) {
      this.game.doMove(move);
      if (unselect) this.unselectAllPieces();
    }
    this.game.nextTurn();
    this.recordPlayerAction({ type: "move", data: move, timestamp });
    this.maybeUpdateClocks(timestamp);
    this.startOfTurn();
  }

  maybeUpdateClocks(asOf?: TimestampMillis): void {
    asOf = asOf || Date.now();
    const everyoneWillHaveDoneSomething =
      uniq(
        this.playerActionHistory
          .slice(0, this.positionInHistory)
          .map((m) => m.data?.playerName)
          .filter(isPresent)
      ).length === this.game.players.length;
    if (everyoneWillHaveDoneSomething) this.game.updateClocks(asOf);
  }

  doResign({
    resignation,
    timestamp,
  }: {
    resignation: Resignation;
    timestamp?: TimestampMillis;
  }): void {
    const player = this.game
      .getPlayers()
      .find((p): boolean => p.name === resignation.playerName);
    if (player) {
      player.alive = false;
      player.endGameMessage = "resigned";
      if (this.game.getCurrentPlayerName() === player.name) {
        this.doMove();
        return;
      }
      this.recordPlayerAction({ type: "resign", data: resignation, timestamp });
      if (this.game.alivePlayers().length < 2) this.checkGameEndConditions();
      this.render();
    }
  }

  toggleOfferDraw({ playerName }: Draw): void {
    const player = this.game.getPlayers().find((p) => p.name === playerName);
    if (!player) return;
    player.wantsToDraw = !player.wantsToDraw;
    if (this.game.alivePlayers().every((p) => p.wantsToDraw)) {
      this.game.alivePlayers().forEach((p): void => {
        p.alive = false;
        p.endGameMessage = "agreed to draw";
      });
      this.gameOver = true;
      this.result = "Draw by agreement!";
    }
    this.render();
  }

  recordPlayerAction(playerAction: PlayerAction): void {
    if (this.stateIsCurrent())
      this.playerActionHistory.push({ timestamp: Date.now(), ...playerAction });
    this.positionInHistory += 1;
  }

  startOfTurn(): void {
    this.interrupt.for.formatControlAtTurnStart({ gameMaster: this });
    this.interrupt.for.preprocessingAtTurnStart({
      game: this.game,
      gameClones: this.gameClones,
      player: this.game.getCurrentPlayer(),
    });
    if (this.game.getCurrentPlayer().alive || this.game.alivePlayers().length === 0) {
      this.checkGameEndConditions();
      this.render(); // TODO: avoid excess renders when pressing back button
    } else if (this.stateIsCurrent()) {
      this.doMove();
    } else {
      this.render();
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
      !this.game.players[this.game.getCurrentPlayerIndex()].alive &&
      this.game.alivePlayers().length > 0 &&
      this.stateIsCurrent()
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
        game: this.game,
        player: player,
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
    // TODO: once there are other win conditions check those with an interruption point
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

  isOnline(): boolean {
    return false;
  }
}
