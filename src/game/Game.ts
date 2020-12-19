import { Board } from "./Board";
import { Clock } from "./Clock";
import { Move, Player, PlayerName } from "./types";
import { CompactRules } from "./Rules/Rules";

export class Game {
  constructor(
    public interrupt: CompactRules,
    public board: Board,
    public clock: Clock | undefined,
    public players: Player[] = [
      new Player(PlayerName.White),
      new Player(PlayerName.Black),
      new Player(PlayerName.Silver, false, " ate shit"),
      new Player(PlayerName.Gold, false, " got blown up"),
      // new Player(PlayerName.Red, false, " lost by accidental suicide"),
      // new Player(PlayerName.Blue, false, "didn't get to play"),
    ],
    public currentPlayerIndex: number = 0,
    public currentTurn: number = 1
  ) {}

  clone(): Game {
    return new Game(
      this.interrupt, // When we start updating the rules, we'll need to clone the interrupt, perhaps by storing the list of rules and regenerating
      this.board.clone(),
      undefined, // Clones don't need a clock at the moment
      this.players.map((p) => p.clone()),
      this.currentPlayerIndex,
      this.currentTurn
    );
  }

  resetTo(savePoint: Game): void {
    this.interrupt = savePoint.interrupt; // .resetTo(savePoint.interrupt);
    this.board.resetTo(savePoint.board);
    this.players = savePoint.players;
    this.currentPlayerIndex = savePoint.currentPlayerIndex;
    this.currentTurn = savePoint.currentTurn;
  }

  static createGame(interrupt: CompactRules, time: number | undefined): Game {
    const clock = time
      ? new Clock([PlayerName.White, PlayerName.Black], time)
      : undefined;
    clock?.setActivePlayers([PlayerName.White]);
    return new Game(interrupt, Board.createBoard(interrupt), clock);
  }

  doMove(move?: Move): void {
    if (!move) return;
    this.board.displacePieces(move.pieceDeltas);
    this.interrupt.for.postMove({
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
    this.nextTurn();
  }

  nextTurn(): void {
    const nextPlayer = this.nextAlivePlayer(this.currentPlayerIndex);
    if (nextPlayer !== undefined) {
      this.currentPlayerIndex = nextPlayer;
      this.clock?.setActivePlayers([this.players[nextPlayer].name]);
      this.currentTurn++;
    }
  }

  nextAlivePlayer(currentPlayer: number): number | undefined {
    let index: number;
    for (let i = 0; i < this.players.length; i++) {
      index = (currentPlayer + 1 + i) % this.players.length;
      if (this.players[index].alive) return index;
    }
    return undefined;
  }

  alivePlayers(): Player[] {
    return this.players.filter((player) => player.alive);
  }
}
