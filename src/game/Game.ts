import { Board } from "./Board";
import { Clock } from "./Clock";
import { EventCenter } from "./EventCenter";
import { Player } from "./Player";
import { Move } from "./Move";
import { allPossiblePlayerNames, PlayerName, TimestampMillis } from "./types";
import { CompactRules } from "./CompactRules";
import { createPieceBank } from "./CompactRules/utilities";

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
    public currentPlayerIndex: number = 0,
    public currentTurn: number = 1
  ) {}

  clone(): Game {
    const cloneConstructorInput: Required<ConstructorParameters<typeof Game>> = [
      this.interrupt.clone(),
      this.board.clone(),
      undefined, // Clones don't need a clock at the moment
      this.events.clone(),
      this.players.map((p) => p.clone()),
      this.currentPlayerIndex,
      this.currentTurn,
    ];
    return new Game(...cloneConstructorInput);
  }

  resetTo(savePoint: Game): void {
    this.interrupt.resetTo(savePoint.interrupt);
    this.board.resetTo(savePoint.board);
    for (let i = 0; i < savePoint.players.length; i++) {
      this.players[i].resetTo(savePoint.players[i]);
    }
    this.currentPlayerIndex = savePoint.currentPlayerIndex;
    this.currentTurn = savePoint.currentTurn;
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
      currentTurn: this.currentTurn,
    });
    this.removeExpiredTokens();
  }

  nextTurn(clockInfo?: { asOf: TimestampMillis; doClocks: boolean }): void {
    const nextPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    if (nextPlayerIndex !== undefined) {
      this.currentPlayerIndex = nextPlayerIndex;
      if (clockInfo && clockInfo.doClocks) {
        const asOf = clockInfo.asOf;
        this.clock?.setActivePlayers([this.players[nextPlayerIndex].name], asOf);
      }
      this.currentTurn++;
    }
  }

  updateClocks(asOf: TimestampMillis): void {
    this.clock?.setActivePlayers([this.getCurrentPlayerName()], asOf);
  }

  removeExpiredTokens(): void {
    this.board.removeExpiredTokens(this.currentTurn);
    this.board.getPieces().forEach((piece) => {
      piece.removeExpiredTokens(this.currentTurn);
    });
    Object.values(this.board.squares).forEach((square) =>
      square.removeExpiredTokens(this.currentTurn)
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
    return this.players[this.currentPlayerIndex].name;
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getIndexOfPlayer(player: Player | undefined): number | undefined {
    return player ? this.players.findIndex((p) => p.name === player.name) : undefined;
  }
}
