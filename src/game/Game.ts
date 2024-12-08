import { Board } from "./Board";
import { Clock } from "./Clock";
import { EventCenter } from "./EventCenter";
import { Player } from "./Player";
import { Move } from "./Move";
import { allPossiblePlayerNames, PlayerName, TimestampMillis } from "./types";
import { CompactRules } from "./CompactRules";
import { createPieceBank } from "./CompactRules/utilities";
import { cloneDeep } from "lodash";

interface TurnInfo {
  turnName: string;
}

interface ClockInfo {
  asOf: TimestampMillis;
  doClocks: boolean;
}
export class TurnController {
  constructor(
    public currentSubTurn: number = 1, // game loop happens for every sub-turn
    public currentTurn: number = 1, // only increments on player handover
    public currentPlayerIndex: number = 0,
    public inFirstSubTurnOfCurrentTurn: boolean = true,
    public upcomingSubTurnInfoForCurrentTurn: TurnInfo[] = [],
    public currentSubTurnInfo: TurnInfo | undefined
  ) {}

  clone(): TurnController {
    const cloneConstructorInput: Required<ConstructorParameters<typeof TurnController>> =
      [
        this.currentSubTurn,
        this.currentTurn,
        this.currentPlayerIndex,
        this.inFirstSubTurnOfCurrentTurn,
        cloneDeep(this.upcomingSubTurnInfoForCurrentTurn),
        cloneDeep(this.currentSubTurnInfo),
      ];

    return new TurnController(...cloneConstructorInput);
  }

  resetTo(savePoint: TurnController): void {
    this.currentSubTurn = savePoint.currentSubTurn;
    this.currentTurn = savePoint.currentTurn;
    this.currentPlayerIndex = savePoint.currentPlayerIndex;
    this.inFirstSubTurnOfCurrentTurn = savePoint.inFirstSubTurnOfCurrentTurn;
    this.upcomingSubTurnInfoForCurrentTurn = cloneDeep(
      savePoint.upcomingSubTurnInfoForCurrentTurn
    );
    this.currentSubTurnInfo = cloneDeep(savePoint.currentSubTurnInfo);
  }

  getCurrentPlayerIndex(): number {
    return this.currentPlayerIndex;
  }

  getCurrentTurn(): number {
    return this.currentTurn;
  }

  getCurrentSubTurn(): number {
    return this.currentSubTurn;
  }

  getCurrentSubTurnInfo(): TurnInfo | undefined {
    return this.currentSubTurnInfo;
  }

  nextTurn(
    interrupt: CompactRules,
    players: Player[],
    clock?: Clock,
    clockInfo?: ClockInfo
  ): void {
    if (this.inFirstSubTurnOfCurrentTurn) {
      this.inFirstSubTurnOfCurrentTurn = false;
      this.upcomingSubTurnInfoForCurrentTurn = [];
      // create interruption point here...
    }

    if (this.upcomingSubTurnInfoForCurrentTurn.length === 0) {
      const nextPlayerIndex = (this.currentPlayerIndex + 1) % players.length;
      if (nextPlayerIndex !== undefined) {
        this.currentPlayerIndex = nextPlayerIndex;
        if (clockInfo && clockInfo.doClocks) {
          const asOf = clockInfo.asOf;
          clock?.setActivePlayers([players[nextPlayerIndex].name], asOf);
        }
        this.currentTurn++;
        this.currentSubTurn++;
        this.inFirstSubTurnOfCurrentTurn = true;
        this.currentSubTurnInfo = undefined;
      }
    }

    this.currentSubTurnInfo = this.upcomingSubTurnInfoForCurrentTurn.shift();
    this.currentSubTurn++;
  }
}

export class Game {
  constructor(
    public interrupt: CompactRules,
    public board: Board,
    public clock: Clock | undefined,
    public events: EventCenter,
    public players: Player[] = [
      new Player(PlayerName.White),
      new Player(PlayerName.Black),
    ],
    public turnController: TurnController = new TurnController(
      1,
      1,
      0,
      true,
      [],
      undefined
    )
  ) {}

  clone(): Game {
    const cloneConstructorInput: Required<ConstructorParameters<typeof Game>> = [
      this.interrupt.clone(),
      this.board.clone(),
      undefined, // Clones don't need a clock at the moment
      this.events.clone(),
      this.players.map((p) => p.clone()),
      this.turnController.clone(),
    ];
    return new Game(...cloneConstructorInput);
  }

  resetTo(savePoint: Game): void {
    this.interrupt.resetTo(savePoint.interrupt);
    this.board.resetTo(savePoint.board);
    for (let i = 0; i < savePoint.players.length; i++) {
      this.players[i].resetTo(savePoint.players[i]);
    }
    this.turnController.resetTo(savePoint.turnController);
  }

  static createGame(
    interrupt: CompactRules,
    time: number | undefined,
    numberOfPlayers = 2
  ): Game {
    const clock = time
      ? new Clock(allPossiblePlayerNames.slice(0, numberOfPlayers), time)
      : undefined;

    const events = new EventCenter({});
    const players = allPossiblePlayerNames
      .slice(0, numberOfPlayers)
      .map((name) => new Player(name, true));

    const game = new Game(
      interrupt,
      Board.createBoard(interrupt, events, numberOfPlayers),
      clock,
      events,
      players
    );
    interrupt.for.subscribeToEvents({ events });

    createPieceBank(game);

    return game;
  }

  setInterrupt(interrupt: CompactRules): void {
    this.interrupt = interrupt;
    this.board.interrupt = interrupt;
    this.events = new EventCenter({});
    this.board.events = this.events;
    this.interrupt.for.subscribeToEvents({ events: this.events });
  }

  doMove(move?: Move): void {
    if (move) this.board.displacePieces(move);
    this.interrupt.for.postMove({
      game: this,
      interrupt: this.interrupt,
      board: this.board,
      move,
      currentTurn: this.turnController.getCurrentTurn(),
    });
    this.removeExpiredTokens();
  }

  nextTurn(clockInfo?: ClockInfo): void {
    this.turnController.nextTurn(this.interrupt, this.players, this.clock, clockInfo);
  }

  updateClocks(asOf: TimestampMillis): void {
    this.clock?.setActivePlayers([this.getCurrentPlayerName()], asOf);
  }

  removeExpiredTokens(): void {
    const currentTurn = this.turnController.getCurrentTurn();
    this.board.removeExpiredTokens(currentTurn);
    this.board.getPieces().forEach((piece) => {
      piece.removeExpiredTokens(currentTurn);
    });
    Object.values(this.board.squares).forEach((square) =>
      square.removeExpiredTokens(currentTurn)
    );
  }

  getPreviousAlivePlayer(currentPlayerIndex: number): Player | undefined {
    let index: number;
    for (let i = this.players.length - 1; i >= 0; i--) {
      index = (currentPlayerIndex + i) % this.players.length;
      if (this.players[index].alive) return this.players[index];
    }
    return undefined;
  }

  // nextAlivePlayerIndex(currentPlayerIndex: number): number | undefined {
  //   let index: number;
  //   for (let i = 1; i <= this.players.length; i++) {
  //     index = (currentPlayerIndex + i) % this.players.length;
  //     if (this.players[index].alive) return index;
  //   }
  //   return undefined;
  // }

  alivePlayers(): Player[] {
    return this.players.filter((player) => player.alive);
  }

  getCurrentPlayerName(): PlayerName {
    return this.players[this.turnController.getCurrentPlayerIndex()].name;
  }

  getCurrentPlayer(): Player {
    return this.players[this.turnController.getCurrentPlayerIndex()];
  }

  getCurrentPlayerIndex(): number {
    return this.turnController.getCurrentPlayerIndex();
  }

  getCurrentTurn(): number {
    return this.turnController.getCurrentTurn();
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getIndexOfPlayer(player: Player | undefined): number | undefined {
    return player ? this.players.findIndex((p) => p.name === player.name) : undefined;
  }
}
