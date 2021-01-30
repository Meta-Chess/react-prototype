import { Board } from "./Board";
import { Clock } from "./Clock";
import { EventCenter } from "./EventCenter";
import { Player } from "./Player";
import { Move } from "./Move";
import { PlayerName } from "./types";
import { CompactRules } from "./rules";

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
      this.interrupt, // When we start updating the rules, we'll need to clone the interrupt, perhaps by storing the list of rules and regenerating
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
    this.interrupt = savePoint.interrupt; // .resetTo(savePoint.interrupt);
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
      ? new Clock(Array.from(Array(numberOfPlayers).keys()), time)
      : undefined;
    clock?.setActivePlayers([PlayerName.White]);

    const events = new EventCenter({});
    const players = Array.from(Array(numberOfPlayers).keys()).map(
      (name) => new Player(name, true)
    );

    const game = new Game(
      interrupt,
      Board.createBoard(interrupt, events, numberOfPlayers),
      clock,
      events,
      players
    );
    interrupt.for.subscribeToEvents({ events });

    return game;
  }

  doMove(move?: Move): void {
    if (!move) return;
    this.board.displacePieces(move);
    this.interrupt.for.postMove({
      game: this,
      interrupt: this.interrupt,
      board: this.board,
      move,
      currentTurn: this.currentTurn,
    });
    this.board.getPieces().forEach((piece) => {
      piece.removeExpiredTokens(this.currentTurn);
    });
    Object.values(this.board.squares).forEach((square) =>
      square.removeExpiredTokens(this.currentTurn)
    );
  }

  nextTurn(): void {
    const nextPlayerIndex = this.nextAlivePlayerIndex(this.currentPlayerIndex);
    if (nextPlayerIndex !== undefined) {
      this.currentPlayerIndex = nextPlayerIndex;
      this.clock?.setActivePlayers([this.players[nextPlayerIndex].name]);
      this.currentTurn++;
    }
  }

  nextAlivePlayerIndex(currentPlayerIndex: number): number | undefined {
    let index: number;
    for (let i = 1; i <= this.players.length; i++) {
      index = (currentPlayerIndex + i) % this.players.length;
      if (this.players[index].alive) return index;
    }
    return undefined;
  }

  alivePlayers(): Player[] {
    return this.players.filter((player) => player.alive);
  }

  getCurrentPlayerName(): PlayerName {
    return this.players[this.currentPlayerIndex].name;
  }
}
